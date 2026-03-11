import { useState } from 'react';
import { Button } from '@heroui/react';
import { Mail, MapPin, Send } from 'lucide-react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SocialLinks } from '@/components/common/SocialLinks';
import { personalInfo } from '@/lib/data';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            联系我
          </h2>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            欢迎讨论技术、项目合作或只是打个招呼！
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection delay={0.1}>
            <div>
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                联系信息
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'var(--accent-soft)' }}
                  >
                    <Mail
                      className="h-5 w-5"
                      style={{ color: 'var(--accent)' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--muted)' }}
                    >
                      邮箱
                    </p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-medium hover:underline"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'var(--accent-soft)' }}
                  >
                    <MapPin
                      className="h-5 w-5"
                      style={{ color: 'var(--accent)' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--muted)' }}
                    >
                      位置
                    </p>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  className="text-sm font-semibold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  社交媒体
                </h4>
                <SocialLinks />
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  姓名
                </label>
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--field-background)',
                    borderColor: 'var(--field-border)',
                    color: 'var(--field-foreground)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  邮箱
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--field-background)',
                    borderColor: 'var(--field-border)',
                    color: 'var(--field-foreground)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  消息
                </label>
                <textarea
                  placeholder="请输入消息内容..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border resize-none"
                  style={{
                    backgroundColor: 'var(--field-background)',
                    borderColor: 'var(--field-border)',
                    color: 'var(--field-foreground)',
                  }}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitted ? '发送成功！' : isSubmitting ? '发送中...' : '发送消息'}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
