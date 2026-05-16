# UI Kit Screens Source Context

This file contains exact source snippets from the uploaded UI kit for the `screens` category.

## `process-monitoring-final/src/app/screens/PostCreate.tsx`

- Category: `screens`
- Bytes: `5698`
- SHA-256: `df08ea355e9a7d2ef2be55acfed9ba6147834cc7048d4e660728eabd93400f7a`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `PostCreate.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { channels, categories, subjects } from "../data/mockData";
import { Upload, Bold, Italic, Underline, List, ListOrdered, Code } from "lucide-react";

export function PostCreate() {
  const { channelId, categoryId, subjectId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [narrative, setNarrative] = useState('');

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const subject = subjects.find(s => s.id === subjectId);

  if (!channel || !category || !subject) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Subject not found</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "My Channels", path: "/" },
    { label: channel.name, path: `/channel/${channelId}` },
    { label: category.name, path: `/channel/${channelId}/category/${categoryId}` },
    { label: subject.name, path: `/channel/${channelId}/category/${categoryId}/subject/${subjectId}` },
    { label: "Create Post" },
  ];

  const handleCancel = () => {
    navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}`);
  };

  const handlePublish = () => {
    navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">New Post</h1>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handlePublish}>
            Publish Post
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Briefly explain what this post is about..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Narrative</label>
            <span className="text-xs text-muted-foreground">MARKDOWN SUPPORTED</span>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-1 p-2 bg-secondary border-b border-border">
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Underline className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-border mx-1" />
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <List className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <ListOrdered className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-border mx-1" />
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Code className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Write your content here using markdown..."
              className="w-full px-4 py-3 min-h-80 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Attachments</label>
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/40 transition-colors cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, GIF, PDF, or ZIP (max. 100MB)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/PostView.tsx`

- Category: `screens`
- Bytes: `6055`
- SHA-256: `c6d0b76a3e77a5acf75a7c9a6744852cfb54268fec63461961c41aca93433d15`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `PostView.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { channels, categories, subjects, posts } from "../data/mockData";
import { Share2, MoreVertical, ThumbsUp, MessageCircle, Send, Bot } from "lucide-react";
import { BookmarkButton } from "../components/BookmarkButton";

export function PostView() {
  const { channelId, categoryId, subjectId, postId } = useParams();
  const navigate = useNavigate();
  const [aiInput, setAiInput] = useState('');

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const subject = subjects.find(s => s.id === subjectId);
  const post = posts.find(p => p.id === postId);

  if (!channel || !category || !subject || !post) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "My Channels", path: "/" },
    { label: channel.name, path: `/channel/${channelId}` },
    { label: category.name, path: `/channel/${channelId}/category/${categoryId}` },
    { label: subject.name, path: `/channel/${channelId}/category/${categoryId}/subject/${subjectId}` },
    { label: post.title },
  ];

  const handleAskAI = () => {
    if (aiInput.trim()) {
      navigate('/dashboard-chat');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                {post.authorAvatar}
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.date} • {post.readTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">
                {subject.name}
              </span>
              <BookmarkButton
                type="post"
                id={post.id}
                channelId={channelId}
                categoryId={categoryId}
                subjectId={subjectId}
                postId={post.id}
                name={post.title}
                description={post.shortDescription}
                metadata={{ author: post.author, date: post.date }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard-chat')}
                title="Chat with AI"
              >
                <Bot className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <article className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-6">
              <p className="text-sm text-muted-foreground italic">
                AI-generated post narrative
              </p>
            </div>

            <div className="prose prose-slate max-w-none">
              <div
                className="text-foreground"
                dangerouslySetInnerHTML={{
                  __html: post.narrative.replace(/\n/g, '<br />').replace(/## /g, '<h2 class="text-xl font-semibold mt-6 mb-3">').replace(/<h2/g, '</p><h2').replace(/h2>/g, 'h2><p>').replace(/^/, '<p>').replace(/$/, '</p>')
                }}
              />
            </div>
          </article>

          <div className="flex items-center gap-6 py-4 border-t border-b border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm">{post.reactions}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.comments} Comments</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#2a2a2a] shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder="Help me understand..."
              className="flex-1 px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button onClick={handleAskAI} size="md" className="gap-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Giga AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/PricingPage.tsx`

- Category: `screens`
- Bytes: `6068`
- SHA-256: `b13f021d6d9fcf63ce73eb31a84d7205ecd898a7857375440e5ee51093b39aca`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `PricingPage.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useToast } from "../components/Toast";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  cta: string;
}

export function PricingPage() {
  const { showToast } = useToast();

  const tiers: PricingTier[] = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      icon: Zap,
      features: [
        '1 personal channel',
        '5 subjects',
        '20 posts per month',
        'Basic AI chat (100 messages/month)',
        'Community support',
      ],
      cta: 'Get Started Free',
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and growing teams',
      icon: Rocket,
      popular: true,
      features: [
        '5 channels',
        'Unlimited subjects & posts',
        'Advanced AI chat (1,000 messages/month)',
        'Thinking mode & inline reasoning',
        'Priority support',
        'Advanced search & filters',
        'Export data',
      ],
      cta: 'Start Pro Trial',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For organizations with advanced needs',
      icon: Crown,
      features: [
        'Unlimited everything',
        'Unlimited AI messages',
        'Custom AI models',
        'SSO & advanced security',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment',
      ],
      cta: 'Contact Sales',
    },
  ];

  const handleSelectPlan = (planName: string) => {
    showToast('success', `Selected ${planName} plan!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core AI-powered knowledge workspace features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.popular
                    ? 'border-2 border-primary shadow-xl scale-105'
                    : 'border border-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      tier.popular ? 'bg-primary/10' : 'bg-secondary'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        tier.popular ? 'text-primary' : 'text-foreground'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">/{tier.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tier.description}
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    variant={tier.popular ? 'primary' : 'secondary'}
                    onClick={() => handleSelectPlan(tier.name)}
                  >
                    {tier.cta}
                  </Button>

                  <div className="space-y-3 pt-6 border-t border-border">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Need help choosing?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your needs. Get in touch for a personalized demo or consultation.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => showToast('info', 'Opening calendar...')}>
              Schedule a Demo
            </Button>
            <Button variant="secondary" onClick={() => showToast('info', 'Opening chat...')}>
              Talk to Sales
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>All plans include a 14-day free trial. No credit card required.</p>
          <p className="mt-2">Cancel anytime. Annual plans save 20%.</p>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/PrivacyPage.tsx`

- Category: `screens`
- Bytes: `9828`
- SHA-256: `edbe4bbaa379e06439ac26a8f6a5281f97cea9ba72c88b02cddbff6dc6cf3041`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `PrivacyPage.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 24, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to GIGA Intelligence ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered knowledge workspace platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Profile information</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Content Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect the content you create, upload, or share through our platform, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>Channels, categories, subjects, and posts</li>
                  <li>Chat messages and AI interactions</li>
                  <li>Files and attachments</li>
                  <li>Comments and annotations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We automatically collect certain information about your device and how you interact with our services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>Device information and identifiers</li>
                  <li>Log data and analytics</li>
                  <li>Cookies and similar technologies</li>
                  <li>Usage patterns and preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Train and improve our AI models (with your explicit consent)</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">AI and Machine Learning</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform uses artificial intelligence to provide intelligent features:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Your content is processed by AI to provide contextual responses</li>
              <li>We do not use your private data to train public AI models without your explicit consent</li>
              <li>AI interactions are logged for quality improvement and debugging</li>
              <li>You can opt out of AI training at any time in your settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>With service providers who assist in our operations</li>
              <li>In response to legal requests or to protect rights and safety</li>
              <li>With your consent or at your direction</li>
              <li>In connection with a merger, sale, or acquisition</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@gigaintelligence.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 p-6 bg-secondary rounded-xl">
              <p className="font-medium mb-2">GIGA Intelligence Privacy Team</p>
              <p className="text-muted-foreground">Email: privacy@gigaintelligence.com</p>
              <p className="text-muted-foreground">Address: 123 AI Street, San Francisco, CA 94102, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/ProcessMonitor.tsx`

- Category: `screens`
- Bytes: `223`
- SHA-256: `7735455bc357b89d2fa72b3d498c9cc10289a5b161846e4d44396b375274c7ef`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `ProcessMonitor.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { ProcessMonitorView } from '../process-monitoring/views/ProcessMonitorView';

export function ProcessMonitor() {
  return <ProcessMonitorView accessMode="normal" title="Process Monitoring" normalUserId="john" />;
}
```

## `process-monitoring-final/src/app/screens/Profile.tsx`

- Category: `screens`
- Bytes: `15214`
- SHA-256: `19af96aad454737ca6c218d4634b1c542d22d702548f692ef537bf7f22b7b78d`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `Profile.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useRef } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { Modal } from "../components/Modal";
import { AccentColorPicker } from "../components/settings/AccentColorPicker";
import { useToast } from "../components/Toast";
import { useDarkMode } from "../contexts/DarkModeContext";
import { User, Mail, Bell, Shield, HelpCircle, LogOut, Camera, Check, Moon } from "lucide-react";

export function Profile() {
  const { showToast } = useToast();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEmailPrefs, setShowEmailPrefs] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and knowledge worker",
    avatar: null as string | null,
  });

  const [emailPrefs, setEmailPrefs] = useState({
    newsletter: true,
    updates: true,
    marketing: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    desktop: true,
    mobile: true,
    email: true,
    mentions: true,
    comments: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showEmail: false,
    allowAnalytics: true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({ ...profileData, avatar: event.target?.result as string });
        showToast('success', 'Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    showToast('success', 'Profile updated successfully');
    setShowEditProfile(false);
  };

  const handleSaveEmailPrefs = () => {
    showToast('success', 'Email preferences saved');
    setShowEmailPrefs(false);
  };

  const handleSaveNotifications = () => {
    showToast('success', 'Notification settings saved');
    setShowNotifications(false);
  };

  const handleSavePrivacy = () => {
    showToast('success', 'Privacy settings saved');
    setShowPrivacy(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <header>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </header>

      <Card padding="md">
        <div className="flex items-center gap-4">
          <div className="relative group">
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{profileData.name}</h2>
            <p className="text-sm text-muted-foreground">{profileData.email}</p>
          </div>
          <Button variant="secondary" onClick={() => setShowEditProfile(true)}>
            Edit Profile
          </Button>
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Appearance</h2>

        <Card padding="sm" onClick={() => setShowAccentPicker(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <div className="w-5 h-5 bg-primary rounded-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Accent Color</h3>
              <p className="text-sm text-muted-foreground">
                Customize your theme color
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Moon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Toggle dark theme
              </p>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              className={`w-11 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-border'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Account Settings</h2>

        <Card padding="sm" onClick={() => setShowEmailPrefs(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Email Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Manage notification emails
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" onClick={() => setShowNotifications(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Configure notification settings
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" onClick={() => setShowPrivacy(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                Control your privacy settings
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Support</h2>

        <Card padding="sm" className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Help Center</h3>
              <p className="text-sm text-muted-foreground">
                Get help and support
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" onClick={() => showToast('info', 'Signing out...')} className="cursor-pointer hover:border-destructive/40 border-destructive/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-destructive">Sign Out</h3>
              <p className="text-sm text-muted-foreground">
                Sign out of your account
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        title="Edit Profile"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowEditProfile(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </Modal>

      {/* Email Preferences Modal */}
      <Modal
        isOpen={showEmailPrefs}
        onClose={() => setShowEmailPrefs(false)}
        title="Email Preferences"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowEmailPrefs(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEmailPrefs}>
              Save Preferences
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Object.entries(emailPrefs).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div
                onClick={() => setEmailPrefs({ ...emailPrefs, [key]: !value })}
                className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
              </div>
            </label>
          ))}
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notification Settings"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowNotifications(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotifications}>
              Save Settings
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Object.entries(notificationPrefs).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div
                onClick={() => setNotificationPrefs({ ...notificationPrefs, [key]: !value })}
                className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
              </div>
            </label>
          ))}
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy & Security"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowPrivacy(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrivacy}>
              Save Settings
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Object.entries(privacySettings).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30">
              <div>
                <span className="font-medium block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm text-muted-foreground">
                  {key === 'profilePublic' && 'Make your profile visible to others'}
                  {key === 'showEmail' && 'Display your email on your profile'}
                  {key === 'allowAnalytics' && 'Help us improve with usage data'}
                </span>
              </div>
              <div
                onClick={() => setPrivacySettings({ ...privacySettings, [key]: !value })}
                className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
              </div>
            </label>
          ))}
        </div>
      </Modal>

      {/* Accent Color Picker Modal */}
      <Modal
        isOpen={showAccentPicker}
        onClose={() => setShowAccentPicker(false)}
        title="Accent Color"
        size="sm"
      >
        <AccentColorPicker />
      </Modal>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/Settings.tsx`

- Category: `screens`
- Bytes: `15417`
- SHA-256: `d737782f20ceafa33697f71f4a29466712cf2972d7833bbe7b42df7ddc9de081`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `Settings.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Settings as SettingsIcon, Users, Shield, Key, User, CreditCard, ShieldCheck, Network, Activity, BarChart3, Sparkles, Boxes, HardDrive, Building2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [programmaticViewEnabled, setProgrammaticViewEnabled] = useState(() => {
    const stored = localStorage.getItem('programmaticViewEnabled');
    // Enable by default if not set
    if (stored === null) {
      localStorage.setItem('programmaticViewEnabled', 'true');
      return true;
    }
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('programmaticViewEnabled', programmaticViewEnabled.toString());
  }, [programmaticViewEnabled]);

  const handleProgrammaticToggle = () => {
    const newValue = !programmaticViewEnabled;
    setProgrammaticViewEnabled(newValue);
    if (newValue) {
      showToast('success', 'Programmatic view enabled. Toggle available in header.');
    } else {
      showToast('info', 'Programmatic view disabled. Switched to compact view.');
      // Switch back to compact view if currently in programmatic
      if (localStorage.getItem('viewMode') === 'programmatic') {
        localStorage.setItem('viewMode', 'compact');
        window.location.reload(); // Reload to apply the change
      }
    }
  };

  const userSections: SettingSection[] = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Manage your personal profile, avatar, and preferences',
      icon: User,
      path: '/profile',
    },
    {
      id: 'organization',
      title: 'Organization Members',
      description: 'Manage team members, roles, and invitations',
      icon: Users,
      path: '/members',
      badge: 'Team',
    },
    {
      id: 'organization-drive',
      title: 'Organisation Drive',
      description: 'Manage shared files and documents across your organization',
      icon: HardDrive,
      path: '/organization-drive',
      badge: 'Storage',
    },
    {
      id: 'permissions',
      title: 'User Permissions',
      description: 'Configure user roles and access control',
      icon: Shield,
      path: '/permissions',
      badge: 'Security',
    },
    {
      id: 'credentials',
      title: 'Credentials Manager',
      description: 'Manage API keys, tokens, and integrations',
      icon: Key,
      path: '/credentials',
      badge: 'Security',
    },
    {
      id: 'nodes',
      title: 'Nodes',
      description: 'Create and manage custom workflow nodes with TypeScript',
      icon: Boxes,
      path: '/nodes',
      badge: 'Dev',
    },
    {
      id: 'plans-policies',
      title: 'Plans & Policies',
      description: 'Manage subscription plans and usage limitations',
      icon: CreditCard,
      path: '/plans-policies',
      badge: 'Billing',
    },
    {
      id: 'ai-agent-projects',
      title: 'AI Agent Projects',
      description: 'Build and manage full-stack applications with AI',
      icon: Sparkles,
      path: '/ai-agent-projects',
      badge: 'AI',
    },
    {
      id: 'organization-defaults',
      title: 'Organization Defaults',
      description: 'Configure default AI agents and workflows for your organization',
      icon: Building2,
      path: '/organization-defaults',
      badge: 'Org',
    },
  ];

  const adminSections: SettingSection[] = [
    {
      id: 'admin-plans-policies',
      title: 'Admin Plans & Policies',
      description: 'Manage organization and user plans with custom limits',
      icon: ShieldCheck,
      path: '/admin-plans-policies',
      badge: 'Admin',
    },
    {
      id: 'process-monitor',
      title: 'Process Monitor',
      description: 'Real-time monitoring of processes, users, and system resources',
      icon: Activity,
      path: '/process-monitor',
      badge: 'Admin',
    },
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      description: 'Comprehensive dashboard for user and process management',
      icon: BarChart3,
      path: '/admin-dashboard',
      badge: 'Admin',
    },
    {
      id: 'global-defaults',
      title: 'Global Defaults',
      description: 'Configure system-wide default AI agents and workflows',
      icon: Shield,
      path: '/global-defaults',
      badge: 'Root',
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark:text-gray-100">Settings</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Manage your account and organization settings
              </p>
            </div>
          </div>
        </div>

        {/* User Settings Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">User Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {userSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => navigate(section.path)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        {section.badge && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Admin Settings Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-400" />
            Admin Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="group hover:border-red-400 dark:hover:border-red-600 transition-all cursor-pointer border-red-200 dark:border-red-900"
                  onClick={() => navigate(section.path)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                      <Icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {section.title}
                        </h3>
                        {section.badge && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="hover:border-primary/50 dark:hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium dark:text-gray-100 mb-1">Invite Members</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                  Add new team members
                </p>
                <Button size="sm" variant="outline" onClick={() => navigate('/members')}>
                  Invite
                </Button>
              </div>
            </Card>

            <Card className="hover:border-primary/50 dark:hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                  <Key className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium dark:text-gray-100 mb-1">New API Key</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                  Generate new credentials
                </p>
                <Button size="sm" variant="outline" onClick={() => navigate('/credentials')}>
                  Create
                </Button>
              </div>
            </Card>

            <Card className="hover:border-primary/50 dark:hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium dark:text-gray-100 mb-1">Update Roles</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                  Configure permissions
                </p>
                <Button size="sm" variant="outline" onClick={() => navigate('/permissions')}>
                  Manage
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Preferences</h2>
          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Network className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg dark:text-gray-100">Programmatic View</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      Enable hierarchical tree navigation for advanced workspace organization
                    </p>
                  </div>
                  <button
                    onClick={handleProgrammaticToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      programmaticViewEnabled
                        ? 'bg-primary'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        programmaticViewEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {programmaticViewEnabled && (
                  <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-xs text-purple-800 dark:text-purple-300">
                      Programmatic view is now enabled. You can toggle between Compact and Programmatic views using the button in the header.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-8 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <SettingsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-200">
                Need help with settings?
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                Visit our documentation to learn more about managing your organization, configuring permissions, and securing your credentials.
              </p>
              <Button size="sm" variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                View Documentation
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/SharedSpaceFiles.tsx`

- Category: `screens`
- Bytes: `21958`
- SHA-256: `fa0d993fc258fcb80c7589346501d3bf41d969dc7ff7ee63c0df02b46b52b2cb`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `SharedSpaceFiles.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { DataTable, Column } from '../components/DataTable';
import { FileUploadModal } from '../components/FileUploadModal';
import { formatBytes } from '../format';
import {
  ArrowLeft,
  Upload,
  LayoutGrid,
  List,
  Search,
  X,
  FileText,
  File,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  MoreVertical,
  Download,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  Plus,
} from 'lucide-react';

export interface SharedSpaceFile {
  id: string;
  shared_space_id?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  filename?: string | null;
  mime_type?: string | null;
  byte_size?: number | null;
  metadata?: Record<string, unknown> | null;
  created_by?: string | null;
  created_at?: string | null;
}

// Mock data
const mockFiles: SharedSpaceFile[] = [
  {
    id: 'file-1',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/worker.ts',
    filename: 'worker.ts',
    mime_type: 'text/typescript',
    byte_size: 3840,
    metadata: { language: 'typescript', lines: 47, category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-2',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/airtable-node.ts',
    filename: 'airtable-node.ts',
    mime_type: 'text/typescript',
    byte_size: 512,
    metadata: { language: 'typescript', lines: 5, category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-3',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/airtable-schema.json',
    filename: 'airtable-schema.json',
    mime_type: 'application/json',
    byte_size: 4096,
    metadata: { language: 'json', category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-4',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/README.md',
    filename: 'README.md',
    mime_type: 'text/markdown',
    byte_size: 256,
    metadata: { language: 'markdown', category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-5',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/api-spec.ts',
    filename: 'api-spec.ts',
    mime_type: 'text/typescript',
    byte_size: 15360,
    metadata: { language: 'typescript', lines: 245 },
    created_by: 'user-2',
    created_at: '2026-05-02T11:30:00Z',
  },
  {
    id: 'file-6',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/database-schema.sql',
    filename: 'database-schema.sql',
    mime_type: 'application/sql',
    byte_size: 12288,
    metadata: { language: 'sql', tables: 15 },
    created_by: 'user-3',
    created_at: '2026-05-05T09:20:00Z',
  },
  {
    id: 'file-7',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/config.json',
    filename: 'config.json',
    mime_type: 'application/json',
    byte_size: 2048,
    metadata: { language: 'json' },
    created_by: 'user-2',
    created_at: '2026-05-08T16:45:00Z',
  },
  {
    id: 'file-8',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/Engineering-README.md',
    filename: 'Engineering-README.md',
    mime_type: 'text/markdown',
    byte_size: 8192,
    metadata: { language: 'markdown' },
    created_by: 'user-2',
    created_at: '2026-05-02T11:30:00Z',
  },
  {
    id: 'file-9',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/images/logo.png',
    filename: 'logo.png',
    mime_type: 'image/png',
    byte_size: 45056,
    metadata: { width: 512, height: 512 },
    created_by: 'user-2',
    created_at: '2026-05-03T14:15:00Z',
  },
];

const mockSpaces = [
  { id: 'space-1', name: 'Engineering Documents' },
  { id: 'space-2', name: 'Design Assets' },
  { id: 'space-3', name: 'My Private Files' },
  { id: 'space-4', name: 'Marketing Materials' },
];

export default function SharedSpaceFiles() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [files, setFiles] = useState<SharedSpaceFile[]>(mockFiles);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [loadedCount, setLoadedCount] = useState(20);

  const space = mockSpaces.find(s => s.id === spaceId);

  const filteredFiles = useMemo(() => {
    return files.filter(file =>
      file.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.mime_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  // Compute displayed files directly without useEffect
  const displayedFiles = useMemo(() => {
    return filteredFiles.slice(0, loadedCount);
  }, [filteredFiles, loadedCount]);

  const loadMore = () => {
    setLoadedCount(prev => prev + 20);
  };

  const hasMore = displayedFiles.length < filteredFiles.length;

  // Reset loadedCount when search changes
  useEffect(() => {
    setLoadedCount(20);
  }, [searchQuery]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getFileIcon = (mimeType?: string | null) => {
    if (!mimeType) return File;
    if (mimeType.startsWith('image/')) return ImageIcon;
    if (mimeType.startsWith('video/')) return Video;
    if (mimeType.startsWith('audio/')) return Music;
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('rar')) return Archive;
    if (
      mimeType.includes('javascript') ||
      mimeType.includes('typescript') ||
      mimeType.includes('json') ||
      mimeType.includes('sql') ||
      mimeType.includes('python') ||
      mimeType.includes('java')
    ) return Code;
    if (mimeType.includes('text')) return FileText;
    return File;
  };

  const isCodeFile = (mimeType?: string | null) => {
    if (!mimeType) return false;
    return (
      mimeType.includes('javascript') ||
      mimeType.includes('typescript') ||
      mimeType.includes('json') ||
      mimeType.includes('sql') ||
      mimeType.includes('python') ||
      mimeType.includes('java') ||
      mimeType.includes('markdown') ||
      mimeType.includes('text')
    );
  };

  const isImageFile = (mimeType?: string | null) => {
    return mimeType?.startsWith('image/');
  };

  const getFilePreview = (file: SharedSpaceFile) => {
    // For demo purposes, return placeholder images
    if (isImageFile(file.mime_type)) {
      return `https://via.placeholder.com/200x150/6366f1/ffffff?text=${encodeURIComponent(file.filename || 'Image')}`;
    }
    return null;
  };

  const handleViewFile = (file: SharedSpaceFile) => {
    if (isCodeFile(file.mime_type)) {
      navigate(`/organization-drive/${spaceId}/file/${file.id}`);
    } else {
      showToast('info', `Viewing: ${file.filename}`);
      // Open file viewer modal
    }
  };

  const handleDeleteFile = (fileId: string, filename: string | null | undefined) => {
    setFiles(files.filter(f => f.id !== fileId));
    showToast('success', `Deleted "${filename}"`);
  };

  const handleUploadComplete = (uploadedFiles: File[]) => {
    const newFiles: SharedSpaceFile[] = uploadedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      shared_space_id: spaceId,
      storage_bucket: 'org-files',
      storage_path: `/documents/${file.name}`,
      filename: file.name,
      mime_type: file.type || 'application/octet-stream',
      byte_size: file.size,
      metadata: {},
      created_by: 'user-1',
      created_at: new Date().toISOString(),
    }));

    setFiles([...newFiles, ...files]);
    showToast('success', `Uploaded ${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''}`);
  };

  const handleCreateSpace = () => {
    if (!newSpaceName.trim()) {
      showToast('error', 'Please enter a space name');
      return;
    }

    showToast('success', `Created nested space "${newSpaceName}"`);
    setNewSpaceName('');
    setIsCreateSpaceModalOpen(false);
  };

  const fileColumns: Column<SharedSpaceFile>[] = [
    {
      id: 'filename',
      header: 'Name',
      accessor: (file) => {
        const Icon = getFileIcon(file.mime_type);
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{file.filename}</div>
              <div className="text-xs text-muted-foreground">{file.mime_type}</div>
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      id: 'size',
      header: 'Size',
      accessor: (file) => formatBytes(file.byte_size),
      sortable: true,
      width: '120px',
    },
    {
      id: 'created_at',
      header: 'Created',
      accessor: (file) => formatDate(file.created_at),
      sortable: true,
      width: '150px',
    },
    {
      id: 'actions',
      header: '',
      accessor: (file) => (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleViewFile(file);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              showToast('info', `Downloading ${file.filename}`);
            }}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFile(file.id, file.filename);
            }}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
      width: '150px',
    },
  ];

  if (!space) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Space not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold dark:text-gray-100">{space.name}</h1>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsCreateSpaceModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Space
              </Button>
              <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground dark:text-gray-400'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground dark:text-gray-400'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Files Display */}
        {filteredFiles.length > 0 ? (
          viewMode === 'grid' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedFiles.map((file) => {
                  const Icon = getFileIcon(file.mime_type);
                  const preview = getFilePreview(file);
                  return (
                    <Card
                      key={file.id}
                      className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                      onClick={() => handleViewFile(file)}
                    >
                      <div className="space-y-4">
                        {/* File Preview/Icon */}
                        <div className="relative">
                          {preview ? (
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary dark:bg-[#2a2a2a]">
                              <img
                                src={preview}
                                alt={file.filename || ''}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                              <Icon className="w-12 h-12 text-primary opacity-50" />
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <h3 className="font-medium mb-1 dark:text-gray-100 truncate" title={file.filename || ''}>
                            {file.filename}
                          </h3>
                          <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                            {formatBytes(file.byte_size)} • {formatDate(file.created_at)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewFile(file);
                            }}
                            className="flex-1"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFile(file.id, file.filename);
                            }}
                          >
                            <Trash2 className="w-3 h-3 text-red-600 dark:text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" onClick={loadMore} className="gap-2">
                    Load More Files
                  </Button>
                </div>
              )}
            </>
          ) : (
            <DataTable
              columns={fileColumns}
              data={filteredFiles}
              onRowClick={handleViewFile}
              pageSize={20}
            />
          )
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2 dark:text-gray-100">No files found</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload File
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      {/* Create Space Modal */}
      {isCreateSpaceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Create Nested Space</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Space Name
                </label>
                <input
                  type="text"
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  placeholder="e.g., Team Documents"
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-gray-100"
                  autoFocus
                />
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                This will create a new space inside "{space.name}"
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateSpaceModalOpen(false);
                  setNewSpaceName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleCreateSpace} className="flex-1">
                Create Space
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/Signup.tsx`

- Category: `screens`
- Bytes: `19556`
- SHA-256: `a6b2d858952327854eab862c4ad6f9f3de645a0949535d92c0ac035fc406c920`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `Signup.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Building2, Users, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';

type SignupType = 'user' | 'organization';

export function Signup() {
  const navigate = useNavigate();
  const [signupType, setSignupType] = useState<SignupType>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Organization fields
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPassword, setOrgPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const features = [
    'AI-powered knowledge workspace',
    'Unlimited channels and categories',
    'Advanced workflow automation',
    'Real-time collaboration',
    'Enterprise-grade security',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-purple-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-purple-950/20 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Features */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl mb-6 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-foreground dark:text-gray-100 mb-4">
              Start your journey with GIGA Intelligence
            </h1>
            <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8">
              Transform how your team collaborates and manages knowledge with AI-powered intelligence.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground dark:text-gray-200">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 p-6 bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl border border-border dark:border-[#2a2a2a]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-muted-foreground dark:text-gray-400 italic">
                "GIGA Intelligence has completely transformed how we manage our team's knowledge. The AI features are game-changing!"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-sm dark:text-gray-200">John Doe</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">CEO, TechStart Inc</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-border dark:border-[#2a2a2a] p-8">
              {/* Type Toggle */}
              <div className="flex items-center gap-2 p-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg mb-6">
                <button
                  onClick={() => setSignupType('user')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    signupType === 'user'
                      ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                      : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Personal
                </button>
                <button
                  onClick={() => setSignupType('organization')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    signupType === 'organization'
                      ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                      : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Organization
                </button>
              </div>

              <AnimatePresence mode="wait">
                {signupType === 'user' ? (
                  <motion.form
                    key="user"
                    onSubmit={handleSignup}
                    className="space-y-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-11 pr-12 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                        Must be at least 8 characters
                      </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button type="submit" className="w-full py-3 text-base font-semibold gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="organization"
                    onSubmit={handleSignup}
                    className="space-y-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Organization Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="text"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="Acme Corporation"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="email"
                          value={orgEmail}
                          onChange={(e) => setOrgEmail(e.target.value)}
                          placeholder="admin@company.com"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Admin Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="text"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Team Size
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <select
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        >
                          <option value="">Select team size</option>
                          <option value="1-10">1-10 people</option>
                          <option value="11-50">11-50 people</option>
                          <option value="51-200">51-200 people</option>
                          <option value="201+">201+ people</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={orgPassword}
                          onChange={(e) => setOrgPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-11 pr-12 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button type="submit" className="w-full py-3 text-base font-semibold gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            Create Organization
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground dark:text-gray-400 text-center mt-4">
                By signing up, you agree to our{' '}
                <button className="text-primary hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button className="text-primary hover:underline">Privacy Policy</button>
              </p>
            </div>

            <p className="text-center mt-6 text-sm text-muted-foreground dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/SubjectHub.tsx`

- Category: `screens`
- Bytes: `13118`
- SHA-256: `30251f8fbb9c0b929e9d46aa655e02580f9de2ff5eaeeb1cf04cf56611678ce3`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `SubjectHub.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { DataTable, Column } from "../components/DataTable";
import { channels, categories, subjects, posts, Post } from "../data/mockData";
import { Sparkles, FileText, ThumbsUp, MessageCircle, LayoutGrid, List, Bot } from "lucide-react";
import { Button } from "../components/Button";
import { BookmarkButton } from "../components/BookmarkButton";

export function SubjectHub() {
  const { channelId, categoryId, subjectId } = useParams();
  const navigate = useNavigate();
  const [aiInput, setAiInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const subject = subjects.find(s => s.id === subjectId);
  const subjectPosts = posts.filter(p => p.subjectId === subjectId);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [subjectId]);

  const handleAskAI = () => {
    if (aiInput.trim()) {
      navigate('/dashboard-chat');
    }
  };

  const postColumns: Column<Post>[] = [
    {
      id: 'title',
      header: 'Title',
      accessor: (post) => (
        <div>
          <h3 className="font-medium mb-1">{post.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{post.shortDescription}</p>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'author',
      header: 'Author',
      accessor: (post) => post.author,
      sortable: true,
      width: '150px',
    },
    {
      id: 'date',
      header: 'Date',
      accessor: (post) => post.date,
      sortable: true,
      width: '120px',
    },
    {
      id: 'readTime',
      header: 'Read Time',
      accessor: (post) => post.readTime,
      width: '100px',
    },
    {
      id: 'engagement',
      header: 'Engagement',
      accessor: (post) => (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{post.reactions}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{post.comments}</span>
          </div>
        </div>
      ),
      width: '150px',
    },
  ];

  if (!channel || !category || !subject) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <ErrorState
            title="Subject not found"
            message="The subject you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0">
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
            <div className="space-y-3 animate-pulse">
              <div className="h-10 w-96 bg-secondary dark:bg-[#2a2a2a] rounded" />
              <div className="h-6 w-full max-w-2xl bg-secondary dark:bg-[#2a2a2a] rounded" />
            </div>
            <LoadingState type="skeleton-card" count={1} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6">
            <LoadingState type="skeleton-list" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <ErrorState
            title="Failed to load subject"
            message="We couldn't load this subject. Please try again."
            onRetry={() => {
              setError(false);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 600);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <header className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold dark:text-gray-100">{subject.name}</h1>
                  {subject.tag && (
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">
                      {subject.tag}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground dark:text-gray-400 text-lg">{subject.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <BookmarkButton
                  type="subject"
                  id={subject.id}
                  channelId={channelId}
                  categoryId={categoryId}
                  subjectId={subject.id}
                  name={subject.name}
                  description={subject.description}
                  metadata={{ postCount: subject.postCount }}
                  variant="button"
                />
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard-chat')}
                  className="gap-2"
                >
                  <Bot className="w-4 h-4" />
                  Chat with AI
                </Button>
              </div>
            </div>
          </header>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20 dark:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 dark:text-gray-100">AI Summary</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                  This subject covers essential concepts and practical applications. The AI
                  can help you understand key topics, provide examples, and answer specific
                  questions about the material covered in the posts below. Ask anything to
                  get started.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-background dark:bg-[#0a0a0a] py-4 z-10">
              <h2 className="text-lg font-semibold dark:text-gray-100">Posts ({subjectPosts.length})</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                        : 'hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'table'
                        ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                        : 'hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                    title="Table view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <Button size="sm" onClick={() => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/create`)}>
                  Create Post
                </Button>
              </div>
            </div>

            {subjectPosts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="space-y-3">
                  {subjectPosts.map(post => (
                    <Card padding="md"
                      key={post.id}
                      onClick={() => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/post/${post.id}`)}
                      className="hover:border-primary/40 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                          {post.authorAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold mb-1 dark:text-gray-100">{post.title}</h3>
                              <p className="text-xs text-muted-foreground dark:text-gray-500">
                                {post.author} • {post.date} • {post.readTime}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3 line-clamp-2">
                            {post.shortDescription}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{post.reactions}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <DataTable
                  columns={postColumns}
                  data={subjectPosts}
                  onRowClick={(post) => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/post/${post.id}`)}
                  pageSize={10}
                />
              )
            ) : (
              <EmptyState
                icon={FileText}
                title="No posts yet"
                message="Create your first post to start sharing knowledge"
                action={{
                  label: "Create Post",
                  onClick: () => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/create`),
                }}
              />
            )}
          </section>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0a0a0a] shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder={`Ask AI about ${subject.name}...`}
              className="flex-1 px-4 py-3 bg-secondary/50 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-[#1a1a1a] transition-all"
            />
          </div>
          <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2 text-center">
            AI answers stay focused on this subject
          </p>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/UnifiedChat.tsx`

- Category: `screens`
- Bytes: `29965`
- SHA-256: `137cafcd67d457c7ef8371f3fc813fa19eb4c4100c7a560b46e6e6c2bb4fdbee`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `UnifiedChat.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useRef } from "react";
import { Send, X, Plus, ChevronRight, Mic, FileDown, MicOff, Bot, Zap, Settings } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useToast } from "../components/Toast";
import { FileAttachmentManager } from "../components/FileAttachmentManager";
import { ActivityPanel, ThinkingStep } from "../components/ActivityPanel";
import { IntelligenceModal } from "../components/IntelligenceModal";
import { InlineConfirmation } from "../components/InlineConfirmation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'file';
}

interface ConfirmationData {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  shown: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  attachments?: Attachment[];
  timestamp: string;
  dashboard?: DashboardData;
  thinking?: ThinkingData;
  inlineThinking?: string;
  confirmation?: ConfirmationData;
}

interface ThinkingData {
  duration: number;
  steps: ThinkingStep[];
}

interface DashboardData {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }>;
}

type AttachmentType = 'agent' | 'workflow' | 'default';

export function UnifiedChat() {
  const { showToast } = useToast();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachmentType, setAttachmentType] = useState<AttachmentType>('default');
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [activeThinking, setActiveThinking] = useState<ThinkingData | null>(null);
  const [showIntelligenceModal, setShowIntelligenceModal] = useState(false);

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  const generateDashboard = (query: string): DashboardData | undefined => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('sales') || lowerQuery.includes('revenue') || lowerQuery.includes('performance')) {
      return {
        title: 'Sales Performance Dashboard',
        metrics: [
          { label: 'Total Revenue', value: '$124,563', change: '+12.5%', trend: 'up' },
          { label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up' },
          { label: 'Conversion Rate', value: '3.24%', change: '-0.4%', trend: 'down' },
          { label: 'Avg Order Value', value: '$43.76', change: '+5.1%', trend: 'up' },
        ],
      };
    }

    if (lowerQuery.includes('user') || lowerQuery.includes('engagement') || lowerQuery.includes('analytics')) {
      return {
        title: 'User Engagement Dashboard',
        metrics: [
          { label: 'Active Users', value: '12,456', change: '+15.2%', trend: 'up' },
          { label: 'Session Duration', value: '4m 32s', change: '+2.1%', trend: 'up' },
          { label: 'Bounce Rate', value: '42.3%', change: '-3.5%', trend: 'up' },
          { label: 'Page Views', value: '45,678', change: '+8.7%', trend: 'up' },
        ],
      };
    }

    return undefined;
  };

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, userMessage]);

    // Generate AI response with dashboard if applicable
    setTimeout(() => {
      const dashboard = generateDashboard(input);

      const thinkingSteps: ThinkingStep[] = [
        { type: 'thinking', content: 'Analyzing query parameters and context' },
        { type: 'code', content: 'const query = parseUserInput(message);\nconst intent = detectIntent(query);', language: 'JavaScript' },
        { type: 'thinking', content: 'Fetching relevant data sources from database' },
        { type: 'code', content: 'SELECT * FROM metrics\nWHERE date >= CURRENT_DATE - INTERVAL \'30 days\'\nORDER BY date DESC;', language: 'SQL' },
        { type: 'thinking', content: 'Processing metrics and generating visualization data' },
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: dashboard
          ? `I've generated a ${dashboard.title.toLowerCase()} based on your request. Here are the key metrics:`
          : `I understand you're asking about "${input}". Try asking me to show sales performance, revenue dashboard, or user analytics to generate interactive dashboards.`,
        timestamp: new Date().toLocaleTimeString(),
        dashboard,
        thinking: {
          duration: Math.floor(Math.random() * 10) + 3,
          steps: thinkingSteps,
        },
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput('');
    setAttachments([]);
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);

      // Simulate transcription
      setTimeout(() => {
        const simulatedText = "This is a simulated voice transcription. In production, this would use the Web Speech API or a transcription service.";
        setInput(simulatedText);
        showToast('success', 'Voice transcribed');
      }, 500);
    } else {
      // Start recording
      setIsRecording(true);
      showToast('info', 'Recording... (simulated)');

      // Auto-stop after 3 seconds for demo
      setTimeout(() => {
        if (isRecording) {
          handleVoiceRecord();
        }
      }, 3000);
    }
  };

  const handleFileAttach = (files: Attachment[]) => {
    setAttachments(files);
  };

  const handleThinkingClick = (thinking: ThinkingData) => {
    setActiveThinking(thinking);
    setShowActivity(true);
  };

  const exportToPDF = async (elementRef: HTMLDivElement | null, filename: string = 'dashboard') => {
    if (!elementRef) return;

    try {
      const canvas = await html2canvas(elementRef, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${filename}-${Date.now()}.pdf`);

      showToast('success', 'Exported to PDF successfully');
    } catch (error) {
      showToast('error', 'Failed to export PDF');
    }
  };

  const getModeLabel = () => {
    switch (attachmentType) {
      case 'agent': return 'AI Agent';
      case 'workflow': return 'Workflow';
      case 'default': return 'Default';
      default: return 'Default';
    }
  };

  const getModeIcon = () => {
    switch (attachmentType) {
      case 'agent': return <Bot className="w-4 h-4" />;
      case 'workflow': return <Zap className="w-4 h-4" />;
      case 'default': return null;
      default: return null;
    }
  };

  return (
    <div className="h-screen flex bg-white dark:bg-[#0f0f0f] overflow-hidden">
      {/* Main Content Area */}
      {messages.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-semibold mb-12 text-center dark:text-gray-100">What's on the agenda today?</h1>

          {/* Input */}
          <div className="w-full max-w-3xl mb-6">
            <div className="relative flex items-center gap-3 border border-border dark:border-[#2a2a2a] rounded-full px-4 py-3 shadow-sm bg-white dark:bg-[#1a1a1a] focus-within:border-primary/50 transition-all">
              <button
                onClick={() => setShowFileManager(true)}
                className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors flex-shrink-0 dark:text-gray-200"
                title="Attach files"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask anything"
                className="flex-1 bg-transparent focus:outline-none text-base dark:text-gray-100 dark:placeholder:text-gray-400"
              />

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <button
                    onClick={() => setShowModeMenu(!showModeMenu)}
                    className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors"
                  >
                    {getModeIcon()}
                    <span>{getModeLabel()}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${showModeMenu ? 'rotate-90' : '-rotate-90'}`} />
                  </button>

                  {showModeMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                      <button
                        onClick={() => { setAttachmentType('agent'); setShowModeMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'agent' ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        <Bot className="w-4 h-4" />
                        AI Agent
                      </button>
                      <button
                        onClick={() => { setAttachmentType('workflow'); setShowModeMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'workflow' ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        <Zap className="w-4 h-4" />
                        Workflow
                      </button>
                      <button
                        onClick={() => { setAttachmentType('default'); setShowModeMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${attachmentType === 'default' ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        Default
                      </button>
                      <div className="border-t border-border dark:border-[#2a2a2a] my-1"></div>
                      <button
                        onClick={() => { setShowIntelligenceModal(true); setShowModeMenu(false); }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Configure
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleVoiceRecord}
                  className={`p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors dark:text-gray-200 ${isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : ''}`}
                  title={isRecording ? 'Stop recording' : 'Record voice'}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() && attachments.length === 0}
                  className={`p-2 rounded-lg transition-colors ${
                    input.trim() || attachments.length > 0
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {attachments.map((att) => (
                  <div key={att.id} className="relative group">
                    {att.type === 'image' && att.preview ? (
                      <div className="relative">
                        <img
                          src={att.preview}
                          alt={att.file.name}
                          className="w-16 h-16 object-cover rounded border border-border"
                        />
                        <button
                          onClick={() => removeAttachment(att.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-16 h-16 bg-secondary rounded border border-border flex items-center justify-center p-1">
                          <span className="text-xs text-center truncate">{att.file.name.split('.').pop()}</span>
                        </div>
                        <button
                          onClick={() => removeAttachment(att.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setInput('Show sales performance')}
              className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm dark:text-gray-200"
            >
              📊 Create a dashboard
            </button>
            <button
              onClick={() => setInput('Analyze user engagement')}
              className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm dark:text-gray-200"
            >
              ✏️ Analyze data
            </button>
            <button
              onClick={() => setInput('Generate revenue report')}
              className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm dark:text-gray-200"
            >
              🌐 Generate report
            </button>
          </div>
        </div>
      ) : (
        /* Messages View */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16">
            <div className="max-w-4xl mx-auto py-8 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${message.type === 'user' ? 'max-w-2xl' : 'w-full max-w-full'}`}>
                    {/* Thinking Section (for AI messages only, shown before content) */}
                    {message.type === 'ai' && message.thinking && (
                      <button
                        onClick={() => handleThinkingClick(message.thinking!)}
                        className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors mb-3"
                      >
                        <span>Thought for {message.thinking.duration}s</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {/* Inline Thinking (for AI messages only) */}
                    {message.type === 'ai' && message.inlineThinking && (
                      <div className="mb-3 pl-4 border-l-2 border-border dark:border-[#2a2a2a]">
                        <p className="text-sm text-muted-foreground dark:text-gray-400 italic">{message.inlineThinking}</p>
                      </div>
                    )}

                    {/* Text Content */}
                    {message.content && (
                      <div className={`mb-4 ${message.type === 'user' ? 'bg-secondary/50 dark:bg-[#2a2a2a] rounded-2xl px-4 py-3' : ''}`}>
                        <p className="text-base leading-relaxed whitespace-pre-wrap dark:text-gray-100">{message.content}</p>
                      </div>
                    )}

                    {/* Inline Confirmation */}
                    {message.type === 'ai' && message.confirmation && message.confirmation.shown && (
                      <InlineConfirmation
                        message={message.confirmation.message}
                        onConfirm={message.confirmation.onConfirm}
                        onCancel={message.confirmation.onCancel}
                      />
                    )}

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {message.attachments.map((att) => (
                          <div key={att.id}>
                            {att.type === 'image' && att.preview ? (
                              <img
                                src={att.preview}
                                alt={att.file.name}
                                className="max-w-sm rounded-lg border border-border dark:border-[#2a2a2a]"
                              />
                            ) : (
                              <div className="p-3 bg-secondary dark:bg-[#2a2a2a] rounded-lg border border-border dark:border-[#2a2a2a] text-sm dark:text-gray-200">
                                {att.file.name}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dashboard */}
                    {message.dashboard && (
                      <div className="w-full mb-4" id={`dashboard-${message.id}`}>
                        <Card padding="md">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">{message.dashboard.title}</h3>
                              <Button
                                variant="icon"
                                iconOnly
                                size="sm"
                                onClick={() => {
                                  const element = document.getElementById(`dashboard-${message.id}`);
                                  exportToPDF(element as HTMLDivElement, message.dashboard!.title.replace(/\s+/g, '-').toLowerCase());
                                }}
                                title="Download as PDF"
                              >
                                <FileDown className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {message.dashboard.metrics.map((metric, index) => (
                                <div key={index} className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg bg-secondary/30 dark:bg-[#2a2a2a]/50">
                                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">{metric.label}</div>
                                  <div className="text-2xl font-bold mb-1 dark:text-gray-100">{metric.value}</div>
                                  <div className={`text-sm ${
                                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {metric.change}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area (sticky bottom) */}
          <div className="border-t border-border dark:border-[#2a2a2a] px-4 sm:px-8 md:px-16 py-4 bg-white dark:bg-[#0f0f0f]">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-center gap-3 border border-border dark:border-[#2a2a2a] rounded-full px-4 py-3 shadow-sm bg-white dark:bg-[#1a1a1a] focus-within:border-primary/50 transition-all">
                <button
                  onClick={() => setShowFileManager(true)}
                  className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors flex-shrink-0 dark:text-gray-200"
                  title="Attach files"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask anything"
                  className="flex-1 bg-transparent focus:outline-none text-base dark:text-gray-100 dark:placeholder:text-gray-400"
                />

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setShowModeMenu(!showModeMenu)}
                      className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors"
                    >
                      {getModeIcon()}
                      <span>{getModeLabel()}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${showModeMenu ? 'rotate-90' : '-rotate-90'}`} />
                    </button>

                    {showModeMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                        <button
                          onClick={() => { setAttachmentType('agent'); setShowModeMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'agent' ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          <Bot className="w-4 h-4" />
                          AI Agent
                        </button>
                        <button
                          onClick={() => { setAttachmentType('workflow'); setShowModeMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'workflow' ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          <Zap className="w-4 h-4" />
                          Workflow
                        </button>
                        <button
                          onClick={() => { setAttachmentType('default'); setShowModeMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${attachmentType === 'default' ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          Default
                        </button>
                        <div className="border-t border-border dark:border-[#2a2a2a] my-1"></div>
                        <button
                          onClick={() => { setShowIntelligenceModal(true); setShowModeMenu(false); }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Configure
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleVoiceRecord}
                    className={`p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors dark:text-gray-200 ${isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : ''}`}
                    title={isRecording ? 'Stop recording' : 'Record voice'}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={handleSend}
                    disabled={!input.trim() && attachments.length === 0}
                    className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                      input.trim() || attachments.length > 0
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {attachments.map((att) => (
                    <div key={att.id} className="relative group">
                      {att.type === 'image' && att.preview ? (
                        <div className="relative">
                          <img
                            src={att.preview}
                            alt={att.file.name}
                            className="w-16 h-16 object-cover rounded border border-border dark:border-[#2a2a2a]"
                          />
                          <button
                            onClick={() => removeAttachment(att.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-16 h-16 bg-secondary dark:bg-[#2a2a2a] rounded border border-border dark:border-[#2a2a2a] flex items-center justify-center">
                            <span className="text-xs dark:text-gray-200">{att.file.name.split('.').pop()}</span>
                          </div>
                          <button
                            onClick={() => removeAttachment(att.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity Panel (pushed to side) */}
      {showActivity && activeThinking && (
        <ActivityPanel
          isOpen={showActivity}
          onClose={() => setShowActivity(false)}
          duration={activeThinking.duration}
          steps={activeThinking.steps}
        />
      )}

      {/* File Attachment Manager Modal */}
      <FileAttachmentManager
        isOpen={showFileManager}
        onClose={() => setShowFileManager(false)}
        onAttach={handleFileAttach}
        existingAttachments={attachments}
      />

      {/* Intelligence Modal */}
      <IntelligenceModal
        isOpen={showIntelligenceModal}
        onClose={() => setShowIntelligenceModal(false)}
      />
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/UserPermissions.tsx`

- Category: `screens`
- Bytes: `7388`
- SHA-256: `409246249029a22ec601a209e225a90ba602936552a204dc7099a2e847fb4c11`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `UserPermissions.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { Shield, Save } from "lucide-react";
import { PermissionsMatrix, PermissionCategory, Role } from "../components/PermissionsMatrix";
import { Button } from "../components/Button";
import { useToast } from "../components/Toast";

export function UserPermissions() {
  const { showToast } = useToast();

  const roles: Role[] = [
    { id: 'admin', name: 'Admin', description: 'Full system access' },
    { id: 'manager', name: 'Manager', description: 'Team management' },
    { id: 'editor', name: 'Editor', description: 'Content editing' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access' },
  ];

  const categories: PermissionCategory[] = [
    {
      id: 'content',
      name: 'Content Management',
      permissions: [
        { id: 'content.view', name: 'View Content', description: 'Can view all content' },
        { id: 'content.create', name: 'Create Content', description: 'Can create new content' },
        { id: 'content.edit', name: 'Edit Content', description: 'Can edit existing content' },
        { id: 'content.delete', name: 'Delete Content', description: 'Can delete content' },
        { id: 'content.publish', name: 'Publish Content', description: 'Can publish content to production' },
      ],
    },
    {
      id: 'users',
      name: 'User Management',
      permissions: [
        { id: 'users.view', name: 'View Users', description: 'Can view user list and profiles' },
        { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts' },
        { id: 'users.edit', name: 'Edit Users', description: 'Can edit user details' },
        { id: 'users.delete', name: 'Delete Users', description: 'Can delete user accounts' },
        { id: 'users.roles', name: 'Manage Roles', description: 'Can assign roles to users' },
      ],
    },
    {
      id: 'settings',
      name: 'System Settings',
      permissions: [
        { id: 'settings.view', name: 'View Settings', description: 'Can view system settings' },
        { id: 'settings.edit', name: 'Edit Settings', description: 'Can modify system settings' },
        { id: 'settings.billing', name: 'Manage Billing', description: 'Can manage billing and subscriptions' },
        { id: 'settings.security', name: 'Security Settings', description: 'Can configure security settings' },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics & Reports',
      permissions: [
        { id: 'analytics.view', name: 'View Analytics', description: 'Can view analytics dashboards' },
        { id: 'analytics.export', name: 'Export Reports', description: 'Can export analytics data' },
        { id: 'analytics.admin', name: 'Analytics Admin', description: 'Can configure analytics settings' },
      ],
    },
    {
      id: 'api',
      name: 'API Access',
      permissions: [
        { id: 'api.read', name: 'API Read', description: 'Read-only API access' },
        { id: 'api.write', name: 'API Write', description: 'Write API access' },
        { id: 'api.keys', name: 'Manage API Keys', description: 'Can create and manage API keys' },
      ],
    },
  ];

  const [permissions, setPermissions] = useState<Record<string, string[]>>({
    admin: categories.flatMap(c => c.permissions.map(p => p.id)),
    manager: [
      'content.view', 'content.create', 'content.edit', 'content.publish',
      'users.view', 'users.edit', 'users.roles',
      'settings.view',
      'analytics.view', 'analytics.export',
      'api.read',
    ],
    editor: [
      'content.view', 'content.create', 'content.edit',
      'users.view',
      'analytics.view',
      'api.read',
    ],
    viewer: [
      'content.view',
      'users.view',
      'analytics.view',
    ],
  });

  const handlePermissionsChange = (newPermissions: Record<string, string[]>) => {
    setPermissions(newPermissions);
  };

  const handleSave = () => {
    showToast('success', 'Permissions saved successfully');
    console.log('Saved permissions:', permissions);
  };

  const handleReset = () => {
    // Reset to defaults
    setPermissions({
      admin: categories.flatMap(c => c.permissions.map(p => p.id)),
      manager: [
        'content.view', 'content.create', 'content.edit', 'content.publish',
        'users.view', 'users.edit', 'users.roles',
        'settings.view',
        'analytics.view', 'analytics.export',
        'api.read',
      ],
      editor: [
        'content.view', 'content.create', 'content.edit',
        'users.view',
        'analytics.view',
        'api.read',
      ],
      viewer: [
        'content.view',
        'users.view',
        'analytics.view',
      ],
    });
    showToast('info', 'Permissions reset to defaults');
  };

  return (
    <div className="h-screen flex flex-col bg-secondary/30 dark:bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold dark:text-gray-200">Role Permissions</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Configure granular permissions for each role
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleReset}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] h-full overflow-auto">
            <PermissionsMatrix
              categories={categories}
              roles={roles}
              initialPermissions={permissions}
              onChange={handlePermissionsChange}
              editable={true}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#2a2a2a] p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm text-muted-foreground dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary border border-primary" />
            <span>Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary/50 border border-primary/50" />
            <span>Partially Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a]" />
            <span>Disabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/WorkflowBuilder.tsx`

- Category: `screens`
- Bytes: `4755`
- SHA-256: `570b20b69fb9d41e6d12cce3d132b1726bfdaf07f43291a85c40f815ca37bd17`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `WorkflowBuilder.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { Plus, Sparkles, Database, Users, FileText, BookOpen, Zap, List } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router';

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function WorkflowBuilder() {
  const navigate = useNavigate();

  const templates: WorkflowTemplate[] = [
    {
      id: 'data-enrichment',
      title: 'Data enrichment',
      description: 'Pull together data to answer user questions',
      icon: <Database className="w-5 h-5" />,
    },
    {
      id: 'planning-helper',
      title: 'Planning helper',
      description: 'Simple multi-turn workflow for creating task plans',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'customer-service',
      title: 'Customer service',
      description: 'Resolve customer queries with custom policies',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'structured-qa',
      title: 'Structured Data Q/A',
      description: 'Query databases using natural language',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: 'document-comparison',
      title: 'Document comparison',
      description: 'Analyze and highlight differences across uploaded documents',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'knowledge-assistant',
      title: 'Internal knowledge assistant',
      description: 'Triage and answer questions from employees',
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      {/* Top Bar */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-gray-100">Workflow Builder</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/workflows')} className="gap-2">
            <List className="w-4 h-4" />
            View All Workflows
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3 dark:text-gray-100">
            Create a workflow
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8">
            Build a chat agent workflow with custom logic and tools
          </p>
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                  {template.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold mb-2 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Template Label */}
                <div className="pt-2 border-t border-border dark:border-[#2a2a2a]">
                  <span className="text-xs text-muted-foreground dark:text-gray-500">
                    Template
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State Hint */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Choose a template to get started, or create a workflow from scratch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/WorkflowEditor.tsx`

- Category: `screens`
- Bytes: `14405`
- SHA-256: `a6f85f1fdaf9ef9f94c969b3d96dad54ddbe345c819bbd2bc2cc22812479b914`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `WorkflowEditor.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { Save, Play, Settings, Code, Box, GitBranch } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigate, useSearchParams } from 'react-router';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'response';
  label: string;
  config: Record<string, any>;
}

export default function WorkflowEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workflowId = searchParams.get('id');

  const [workflowName, setWorkflowName] = useState('Customer service bot');
  const [workflowDescription, setWorkflowDescription] = useState('Resolve customer queries with custom policies');
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'settings'>('visual');

  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'trigger',
      label: 'User message received',
      config: {},
    },
    {
      id: '2',
      type: 'condition',
      label: 'Check message intent',
      config: { intents: ['support', 'sales', 'general'] },
    },
    {
      id: '3',
      type: 'action',
      label: 'Query knowledge base',
      config: { database: 'support_docs' },
    },
    {
      id: '4',
      type: 'response',
      label: 'Send AI response',
      config: { template: 'friendly' },
    },
  ]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400';
      case 'condition':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400';
      case 'action':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400';
      case 'response':
        return 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700';
    }
  };

  const handleSave = () => {
    console.log('Saving workflow...');
  };

  const handleTest = () => {
    console.log('Testing workflow...');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      {/* Top Bar */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-xl font-bold bg-transparent border-none outline-none dark:text-gray-100 focus:ring-2 focus:ring-primary rounded px-2 -ml-2"
                />
                <p className="text-sm text-muted-foreground dark:text-gray-400 px-2">
                  {workflowDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="success">v1.5.0</Badge>
              <Button variant="outline" size="sm" onClick={handleTest} className="gap-2">
                <Play className="w-4 h-4" />
                Test
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-border dark:border-[#2a2a2a] -mb-4">
            <button
              onClick={() => setActiveTab('visual')}
              className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'visual'
                  ? 'text-primary dark:text-primary'
                  : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
              }`}
            >
              <Box className="w-4 h-4" />
              Visual Editor
              {activeTab === 'visual' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'code'
                  ? 'text-primary dark:text-primary'
                  : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4" />
              Code
              {activeTab === 'code' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'text-primary dark:text-primary'
                  : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
              {activeTab === 'settings' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'visual' && (
          <div className="max-w-5xl mx-auto">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Workflow Steps</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                Design your workflow by arranging steps in sequence
              </p>

              <div className="space-y-4">
                {nodes.map((node, index) => (
                  <div key={node.id}>
                    <div
                      className={`border-2 rounded-lg p-4 ${getNodeColor(node.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium uppercase tracking-wide">
                              {node.type}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-1">{node.label}</h4>
                          {Object.keys(node.config).length > 0 && (
                            <p className="text-xs opacity-75">
                              {JSON.stringify(node.config, null, 2)}
                            </p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {index < nodes.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-0.5 h-8 bg-border dark:bg-[#2a2a2a]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border dark:border-[#2a2a2a]">
                <Button variant="outline" className="w-full gap-2">
                  <Box className="w-4 h-4" />
                  Add Step
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="max-w-5xl mx-auto">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Workflow Code</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                Edit workflow logic directly in JSON format
              </p>

              <div className="bg-secondary dark:bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm">
                <pre className="text-foreground dark:text-gray-200 whitespace-pre-wrap">
{`{
  "name": "Customer service bot",
  "version": "1.5.0",
  "trigger": {
    "type": "message_received",
    "filters": []
  },
  "steps": [
    {
      "id": "check_intent",
      "type": "condition",
      "config": {
        "intents": ["support", "sales", "general"]
      }
    },
    {
      "id": "query_kb",
      "type": "action",
      "config": {
        "database": "support_docs",
        "max_results": 5
      }
    },
    {
      "id": "generate_response",
      "type": "response",
      "config": {
        "template": "friendly",
        "tone": "professional"
      }
    }
  ]
}`}
                </pre>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">General Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Workflow Name
                  </label>
                  <input
                    type="text"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Description
                  </label>
                  <textarea
                    value={workflowDescription}
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Execution Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Enable retry on failure</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Automatically retry failed executions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Max retry attempts
                  </label>
                  <input
                    type="number"
                    defaultValue={3}
                    min={1}
                    max={10}
                    className="w-32 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    min={5}
                    max={300}
                    className="w-32 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Version Control
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Version notes
                  </label>
                  <textarea
                    placeholder="Describe the changes in this version..."
                    rows={3}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button variant="outline" className="gap-2">
                  <GitBranch className="w-4 h-4" />
                  Create New Version
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
```
