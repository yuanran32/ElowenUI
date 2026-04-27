<template>
  <div class="home-landing">
    <section class="home-command">
      <div class="home-command__content">
        <span class="home-command__eyebrow">Installation</span>
        <h2>快速安装</h2>
        <p>保持接入方式简单直接，先装包，再通过插件方式注册整套组件。</p>
      </div>
      <div class="home-command__code">
        <div class="home-command__snippet">
          <span class="home-command__label">Install</span>
          <pre><code>pnpm add @elowen/elowen-ui</code></pre>
        </div>
        <div class="home-command__snippet">
          <span class="home-command__label">Usage</span>
          <pre><code>import { createApp } from 'vue'
import App from './App.vue'
import ElowenUI from '@elowen/elowen-ui'

createApp(App).use(ElowenUI).mount('#app')</code></pre>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <!-- <span class="section-head__eyebrow">Links</span> -->
        <h2>文档 / 仓库入口</h2>
        <p>把最常用的入口放在首页中段，减少来回找导航的成本。</p>
      </div>

      <div class="entry-grid">
        <a class="entry-card entry-card--primary" href="/guide/getting-started">
          <span class="entry-card__eyebrow">Docs</span>
          <h3>快速开始文档</h3>
          <p>查看安装方式、本地运行命令和基础使用方式。</p>
        </a>
        <a class="entry-card" href="/components/button">
          <span class="entry-card__eyebrow">Components</span>
          <h3>组件文档入口</h3>
          <p>从 Button 开始浏览组件示例、属性和变体说明。</p>
        </a>
        <a class="entry-card" href="/guide/introduce">
          <span class="entry-card__eyebrow">Repository</span>
          <h3>仓库说明入口</h3>
          <!-- <p>当前项目未配置公开仓库地址，先通过介绍页查看仓库结构与工程设计。</p> -->
        </a>
      </div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <!-- <span class="section-head__eyebrow">Advantages</span> -->
        <h2>核心优势</h2>
        <!-- <p>只保留最能代表这套组件库价值的几条核心信息。</p> -->
      </div>

      <div class="advantage-grid">
        <div class="advantage-card">
          <span class="advantage-card__eyebrow">Consistency</span>
          <h3>统一的 API 设计</h3>
          <p>常见组件在 Props、事件、状态和尺寸命名上保持一致，降低使用成本。</p>
        </div>
        <div class="advantage-card">
          <span class="advantage-card__eyebrow">Engineering</span>
          <h3>文档、测试、构建一体化</h3>
          <p>源码、VitePress 文档、测试和构建能力放在同一套工程里，展示更完整。</p>
        </div>
        <div class="advantage-card">
          <span class="advantage-card__eyebrow">Scenario</span>
          <h3>更贴近中后台场景</h3>
          <p>围绕输入、反馈和数据展示组织组件，更适合管理后台与业务页面接入。</p>
        </div>
      </div>
    </section>
  </div>
</template>
