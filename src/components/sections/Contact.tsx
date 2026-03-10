import { useState } from "react";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { personalInfo } from "@/lib/data";
import { SocialLinks } from "@/components/common/SocialLinks";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <AnimatedSection id="contact" className="py-16 sm:py-24 bg-background">
      <Container className="max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-12">联系我</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              联系信息
            </h3>
            <p className="text-muted mb-6">
              欢迎讨论技术、项目合作或只是打个招呼！
            </p>
            <p className="text-muted mb-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[var(--link)] hover:underline"
              >
                {personalInfo.email}
              </a>
            </p>
            <div className="flex gap-2 mt-4">
              <SocialLinks />
            </div>
          </div>
          <Form onSubmit={handleSubmit} className="space-y-4">
            <TextField name="name" className="w-full" isRequired>
              <Label>姓名</Label>
              <Input placeholder="请输入您的姓名" />
            </TextField>
            <TextField name="email" type="email" className="w-full" isRequired>
              <Label>邮箱</Label>
              <Input placeholder="your@email.com" />
            </TextField>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-message">消息</Label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="请输入消息内容..."
                className="w-full rounded-lg border border-[var(--field-border)] bg-[var(--field-background)] px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
              isDisabled={submitted}
              isPending={submitting}
            >
              {({ isPending }) => (isPending ? "发送中..." : submitted ? "已发送" : "发送消息")}
            </Button>
            {submitted && (
              <p className="text-sm text-[var(--success)]">感谢您的留言，我会尽快回复。</p>
            )}
          </Form>
        </div>
      </Container>
    </AnimatedSection>
  );
}
