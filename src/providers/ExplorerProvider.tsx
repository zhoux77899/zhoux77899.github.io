import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { projects } from '@/lib/data';
import { countryIds, getNavigationOffset, readActiveExplorer, resolveExplorerHash } from '@/lib/explorer';
import { ExplorerContext } from './explorerContext';
import type { ExplorerState } from './explorerContext';

function initialExplorer(): ExplorerState {
  const route = resolveExplorerHash(window.location.hash);
  const current = route ?? readActiveExplorer();
  return {
    activeSection: current.section,
    activeDestination: current.destination,
    selectedProjectId: route?.projectId ?? projects[0].id,
    selectedCountryId: route?.countryId ?? countryIds[0],
    heroVisible: true,
  };
}

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialExplorer);

  const selectProject = useCallback((id: string) => {
    if (!projects.some((project) => project.id === id)) return;
    setState((previous) => previous.selectedProjectId === id && previous.activeDestination === 'projects' ? previous : {
      ...previous, selectedProjectId: id, activeSection: 'projects', activeDestination: 'projects',
    });
  }, []);

  const selectCountry = useCallback((id: string) => {
    if (!countryIds.some((country) => country === id)) return;
    setState((previous) => previous.selectedCountryId === id && previous.activeDestination === 'travel' ? previous : {
      ...previous, selectedCountryId: id, activeSection: 'travel', activeDestination: 'travel',
    });
  }, []);

  useEffect(() => {
    let scrollFrame: number | undefined;
    let navigationFrame: number | undefined;
    let navigating = false;
    let navigationTimer: ReturnType<typeof setTimeout> | undefined;

    const syncScroll = () => {
      scrollFrame = undefined;
      const current = readActiveExplorer();
      const anchorOffset = getNavigationOffset();
      const headerHeight = getNavigationOffset('header');
      const figure = document.querySelector('[data-explorer-main]')?.getBoundingClientRect();
      const heroVisible = figure ? figure.bottom > headerHeight && figure.top < window.innerHeight : true;
      const visibleCountries = countryIds.filter((id) => {
        const rect = document.getElementById(`travel-${id}`)?.closest('article')?.getBoundingClientRect();
        return rect && rect.height > 0 && rect.bottom > anchorOffset && rect.top < window.innerHeight;
      });
      setState((previous) => {
        const selectedCountryId = current.section === 'travel' && visibleCountries.length > 0 && !visibleCountries.includes(previous.selectedCountryId as typeof countryIds[number])
          ? visibleCountries[0] : previous.selectedCountryId;
        const activeSection = navigating ? previous.activeSection : current.section;
        const activeDestination = navigating ? previous.activeDestination : current.destination;
        return previous.activeSection === activeSection && previous.activeDestination === activeDestination
          && previous.heroVisible === heroVisible && previous.selectedCountryId === selectedCountryId
          ? previous : { ...previous, activeSection, activeDestination, heroVisible, selectedCountryId };
      });
    };
    const onScroll = () => {
      if (scrollFrame === undefined) scrollFrame = requestAnimationFrame(syncScroll);
    };
    const reveal = (hash: string) => {
      const route = resolveExplorerHash(hash);
      if (!route) return;
      navigating = true;
      clearTimeout(navigationTimer);
      setState((previous) => ({
        ...previous, activeSection: route.section, activeDestination: route.destination,
        selectedProjectId: route.projectId ?? previous.selectedProjectId,
        selectedCountryId: route.countryId ?? previous.selectedCountryId,
      }));
      if (navigationFrame !== undefined) cancelAnimationFrame(navigationFrame);
      navigationFrame = requestAnimationFrame(() => {
        navigationFrame = undefined;
        const anchor = document.getElementById(route.target);
        const target = route.projectId || route.countryId ? anchor?.closest('article') ?? anchor : anchor;
        if (target) {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ block: 'start', inline: route.projectId ? 'center' : 'nearest', behavior: reduce ? 'instant' : 'smooth' });
        }
        navigationTimer = setTimeout(() => { navigating = false; onScroll(); }, 900);
      });
    };
    const onHashChange = () => reveal(window.location.hash);
    const onLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (anchor && anchor.target !== '_blank') reveal(anchor.getAttribute('href') ?? '');
    };
    const cancelNavigation = () => { navigating = false; clearTimeout(navigationTimer); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    window.addEventListener('wheel', cancelNavigation, { passive: true });
    window.addEventListener('touchstart', cancelNavigation, { passive: true });
    document.addEventListener('click', onLinkClick);
    if (resolveExplorerHash(window.location.hash)) navigationFrame = requestAnimationFrame(onHashChange);
    else onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
      window.removeEventListener('wheel', cancelNavigation);
      window.removeEventListener('touchstart', cancelNavigation);
      document.removeEventListener('click', onLinkClick);
      if (scrollFrame !== undefined) cancelAnimationFrame(scrollFrame);
      if (navigationFrame !== undefined) cancelAnimationFrame(navigationFrame);
      clearTimeout(navigationTimer);
    };
  }, []);

  const value = useMemo(() => ({ ...state, selectProject, selectCountry }), [state, selectProject, selectCountry]);
  return <ExplorerContext value={value}>{children}</ExplorerContext>;
}
