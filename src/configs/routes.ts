import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import LevelsPage from "../pages/LevelsPage.vue";
import PlaygroundPage from "../pages/PlaygroundPage.vue";
import CodexStatusPage from "../pages/CodexStatusPage.vue";

/**
 * 路由列表
 */
export default [
  {
    path: "/",
    component: IndexPage,
    redirect: "/learn",
    props: true,
  },
  {
    path: "/learn/:levelKey?",
    component: IndexPage,
    props: true,
  },
  {
    path: "/levels",
    component: LevelsPage,
  },
  {
    path: "/playground",
    component: PlaygroundPage,
  },
  {
    path: "/codex-status",
    component: CodexStatusPage,
  },
] as RouteRecordRaw[];
