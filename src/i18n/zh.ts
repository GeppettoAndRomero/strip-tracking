import type { ToolContent } from './types';

// 简体中文。不做直译，而是按简体工具实际使用的词汇和表达方式意译。
// 不使用夸大用词（轻松 / 快速 / 一键 / 秒变 / 完美 等），privacy 用结构而非承诺来表述
// （BRAND-OPERATING-MODEL / I18N-SEO-GUIDELINE）。方针：不追本土（Baidu）SEO，
// 但仍以简体中文语言本身服务 Google 圈内的海外简体读者。htmlLang 用字体基准 'zh-Hans'。

export const zh: ToolContent = {
  htmlLang: 'zh-Hans',

  meta: {
    title: '从链接中移除追踪参数 — 不上传 | runlocally',
    description:
      '在浏览器内一次性移除一个或多个链接中的 UTM、fbclid、gclid 等追踪参数。粘贴的链接不会被发送到任何地方。开源，支持离线使用。',
    ogTitle: '从链接中移除追踪参数',
    ogDescription: '在浏览器内移除链接中的 UTM、fbclid、gclid 等追踪参数，完全在浏览器内运行，不会上传。',
  },

  hero: {
    h1: '从链接中移除追踪参数',
    tagline: '粘贴一个或多个链接，移除 UTM、fbclid、gclid 等追踪参数 — 全部在浏览器内完成，不会上传。',
  },

  intro: {
    h2: '把链接中的追踪参数干净地去掉',
    paras: [
      '从社交应用、邮件订阅或广告渠道分享出来的链接，往往比它指向的页面本身还要长。问号后面那一长串通常是 utm_source、fbclid、gclid 等追踪数据，是你复制链接的那个渠道加上去的，并不是目标页面本身需要的。',
      '这个工具只用浏览器内置的 URL 和 URLSearchParams API 解析每一个链接，只移除追踪列表中的参数；其余部分 —— 包括目标页面真正需要的查询参数 —— 都会原样保留。',
    ],
  },

  privacy: {
    h2: '为什么你粘贴的链接不会离开设备',
    lead: '这类工具有点讽刺：很多"移除链接追踪"的服务，自己就是一个接收你粘贴链接的服务器 —— 而这本身就是一条记录。这里的隐私来自结构，而不是承诺，因为这样的服务器根本不存在：',
    points: [
      '解析和清理全部在你的浏览器内完成，只用浏览器内置的 URL API。',
      '页面以静态文件的形式分发，不会发出携带你所粘贴链接的请求 —— 既没有可以发送到的服务器，也就无从记录。',
      '源代码公开，任何人都可以查看（MIT）。',
      '可以离线使用 —— 正因为没有任何内容被发送出去，离线才成为可能。',
    ],
    note: '想自己确认的话，可以在粘贴链接时打开浏览器的网络（Network）面板 —— 没有任何请求携带这个链接。',
    sourceLinkText: '查看源代码。',
  },

  howto: {
    h2: '使用方法',
    steps: [
      {
        h3: '粘贴你的链接',
        p: '在文本框中粘贴一个链接，或多个链接（每行一个）。点击"加载示例"可以用示例数据体验效果。',
      },
      {
        h3: '查看具体改动',
        p: '每一行都会显示处理后的链接，以及实际被移除的追踪参数（带删除线），让你清楚看到哪些被去掉、哪些被保留。',
      },
      {
        h3: '复制结果',
        p: '可以单独复制某一条处理后的链接，也可以点击"复制全部处理后的链接"一次性按行复制全部结果。',
      },
    ],
  },

  faqHeading: '常见问题',
  faq: [
    {
      q: '我粘贴的链接会被上传到某个地方吗？',
      a: '不会。解析和清理全部在你的浏览器内完成，只用浏览器内置的 URL 和 URLSearchParams API。没有服务器端处理，你粘贴的链接没有离开设备的途径，也不会被记录。',
    },
    {
      q: '会移除哪些追踪参数？',
      a: '包括 Google / Google 广告（utm_*、gclid、gclsrc、dclid、wbraid、gbraid）、Meta / Facebook（fbclid）、Instagram（igshid、igsh）、Microsoft 广告（msclkid）、Mailchimp（mc_eid、mc_cid）、TikTok（ttclid）、Twitter / X（twclid）、Pinterest（epik）、Yandex（yclid）、HubSpot（_hsenc、_hsmi）、Marketo（mkt_tok）、Vero（vero_id）、Adobe / Omniture（s_cid）、Google Analytics 的客户端/会话标记（_ga、_gl）、通用来源参数（ref、ref_src、ref_url），以及 YouTube / Spotify 的分享追踪参数（si）等。完整且可编辑的列表在源代码中（src/utils/trackingParams.ts）。',
    },
    {
      q: '会不会把页面真正需要的参数也删掉，比如商品 ID？',
      a: '不会。只有追踪列表中的参数才会被移除。像 id、page、color 这类目标网站正常运行所需要的参数会原样保留。',
    },
    {
      q: '如果某一行不是有效的链接会怎样？',
      a: '那一行会显示错误提示，而不是处理结果；批次中的其他行仍会正常处理。',
    },
    {
      q: '可以离线使用吗？',
      a: '可以。它是 PWA，第一次访问后会被缓存，没有网络也能使用。你也可以把它添加到主屏幕。',
    },
    {
      q: '一次可以粘贴的链接数量有上限吗？',
      a: '没有固定上限 —— 这只是纯文本解析，即使几百行也能瞬间处理完成。实际上限取决于你能舒服地粘贴进文本框的内容量。',
    },
  ],

  footer: {
    openSourceLabel: '开源（MIT）',
    partOf: '',
    brandTail: ' 的一部分 — 在你设备上本地运行的小工具。',
    colophon: '由 Geppetto 制作和维护。部分代码在 AI 协助下编写，但所有审查和决定都由维护者负责。',
    securityText: '安全',
  },

  related: {
    h2: '相关工具',
    blogLinkText: '阅读技术说明',
  },
};
