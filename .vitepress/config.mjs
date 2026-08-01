import { defineConfig } from 'vitepress'
import { ImagePreviewPlugin } from 'vitepress-plugin-image-preview'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  srcDir: './docs',
  cleanUrls: true,
  markdown: {
    config: (md) => {
      md.inline.ruler.before('emphasis', 'custom_mark', (state, silent) => {
        if (state.src.charCodeAt(state.pos) !== 0x3D /* = */ || state.src.charCodeAt(state.pos + 1) !== 0x3D) {
          return false;
        }
        const start = state.pos;
        const end = state.src.indexOf('==', start + 2);
        if (end === -1) return false;
        if (!silent) {
          const tokenOpen = state.push('mark_open', 'mark', 1);
          tokenOpen.markup = '==';
          const tokenText = state.push('text', '', 0);
          tokenText.content = state.src.slice(start + 2, end);
          const tokenClose = state.push('mark_close', 'mark', -1);
          tokenClose.markup = '==';
        }
        state.pos = end + 2;
        return true;
      });
    }
  },
  title: "YunLiuCraft 官方文档",
  description: "YunLiuCraft 官方文档",
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=3' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico?v=3' }],
    ['meta', { name: 'keywords', content: '云琉世界,MC服务器,YunLiuCraft,我的世界' }]
  ],
  sitemap: {
    hostname: "https://wiki.yunliucraft.cn",
    lastmod: true
  },
  vite:{
    publicDir: path.resolve(__dirname, '../public'),
    plugins:[
      ImagePreviewPlugin({
        hideOnClickModal:true
      })
    ]
  },
  themeConfig: {
    codeCopy: true,
    // ==========汉化完成的本地搜索==========
    docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  outline: {
    label: '目录',
    level: [2, 3]
  },
  // 移动端菜单：Menu → 菜单
  sidebarMenuLabel: "菜单",
  // 移动端主题：Appearance → 主题
  darkModeSwitchLabel: "主题",

  // 可选配套汉化（一并加上，避免其他英文残留）
  returnToTopLabel: "回到顶部",
  lightModeSwitchTitle: "切换浅色模式",
  darkModeSwitchTitle: "切换深色模式",
  // 全局页脚（仅首页/无侧边栏页面显示）
  footer: {
    message: '享受游戏乐趣，创造奇迹！愿你的创造力在 YunLiuCraft 中无限闪耀！',
    copyright: 'Copyright © 2019 - 2026 YunLiuCraft'
  },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBoxPlaceholder: '输入关键词搜索',
                displayDetails: '显示详细列表',
                resetButtonTitle: '清空搜索',
                backButtonTitle: '关闭',
                noResultsText: '未找到相关文档',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  selectKeyAriaLabel: '回车',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeKeyAriaLabel: 'ESC'
                }
              }
            }
          }
        }
      }
    },

    nav: [
      { text: '主页', link: '/' },
      { text: '加入群聊', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=OzwukaRP2G1wWowig8FGfHJJMoWWPqqY&jump_from=webapi&authKey=T+toW7yZLSeyV142BR0WGVB1EfL0HhrfGJoxIVeiHIASkabDm0WfL0efbsY5tUdJ' }
    ],

    sidebar: [
      {
        text: '📑服务器简介',
        items: [
          { text: '📖服务器简介', link: '/服务器简介' },
          { text: '📜服务器规则', link: '/服务器规则' },
          { text: '🏰主城介绍', link: '/主城介绍' },
          { text: '🌍世界观', link: '/世界观' }
        ]
      },
      {
        text: '📰服务器新闻',
        items: [
          { text: '📰服务器新闻', link: '/服务器新闻' },
        ]
      },
      {
        text: '📣活动通知',
        items: [
          { text: '📢活动通知', link: '/活动通知' },
        ]
      },
      {
        text: '🎮玩法教程(基础类指令)',
        items: [
          { text: '⌨️基础类指令', link: '/基础类指令' },
          { text: '🥽使用VR设备进入服务器', link: '/使用VR设备进入服务器' },
          { text: '🔒箱子锁', link: '/箱子锁' },
          { text: '👤皮肤系统', link: '/皮肤系统' },
          { text: '🎙️语音聊天', link: '/语音聊天' },
          { text: '🌿季节系统', link: '/季节系统' },
          { text: '🗺️地图画', link: '/地图画' },
          { text: '🧘坐、躺、趴、旋转', link: '/坐、躺、趴、旋转' },
          { text: '🧧红包系统', link: '/红包系统' }
        ]
        
      },
      {
        text: '🎮玩法教程(大型玩法)',
        items: [
          { text: '🧪粘液科技', link: '/粘液科技' },
          { text: '📦仓库系统', link: '/仓库系统' },
          { text: '🛡️CoreProtect的使用', link: '/CoreProtect的使用' },
          { text: '🏅称号系统', link: '/称号系统' },
          { text: '🏡领取属于自己的地皮', link: '/领取属于自己的地皮' },
          { text: '🎵点歌', link: '/点歌' },
          { text: '🤝公会系统', link: '/公会系统' },
          { text: '⚡技能', link: '/技能' },
          { text: '👾精英怪与副本', link: '/精英怪与副本' },
          { text: '🏴领地系统', link: '/领地系统' },
          { text: '🌐环球市场', link: '/环球市场' },
          { text: '🛒箱子商店', link: '/箱子商店' },
          { text: '🚗载具系统', link: '/载具系统' },
          { text: '🌱🐟星露谷种植和钓鱼系统', link: '/星露谷种植和钓鱼系统' },
          { text: '🍺饮料酿造', link: '/饮料酿造' },
          { text: '🚇MTR铁路系统', link: '/MTR铁路系统' }
        ]
        
      },
      {
        text: '🚝交通',
        items: [
          { text: '🚇主城轨道交通', link: '/主城轨道交通' },
        ]
      },
      {
        text: '📕服务器历史',
        items: [
          { text: '📜云琉历史', link: '/云琉历史' },
          { text: '👥服务器团队成员(截止至2026年7月31日)', link: '/服务器团队成员(截止至2026年7月31日)' },
          { text: '🙏特别鸣谢名单(排名不分先后)', link: '/特别鸣谢名单(排名不分先后)' },
          { text: '💰赞助列表', link: '/赞助列表' }
        ]
      },
      {
        text: '🖼️服务器风采',
        items: [
        ]
      },
      {
        text: '📒更新日志',
        items: [
          { text: '📝更新日志', link: '/更新日志' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'bilibili', link: 'https://space.bilibili.com/2103009355' }
    ]
  }
})