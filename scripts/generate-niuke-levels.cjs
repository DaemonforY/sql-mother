const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "牛客SQL题库.md");
const outputRoot = path.join(root, "src/levels/custom/牛客SQL题库");

const levelMeta = [
  {
    aliases: ["video_id", "avg_comp_play_rate"],
    difficulty: 1,
    hint: "连接播放日志和视频信息，判断观看时长是否不少于视频时长，再按视频分组计算平均值。",
  },
  {
    aliases: ["tag", "avg_play_progress"],
    difficulty: 1,
    hint: "先计算每次播放进度，超过100%的按100%计入，再按视频类别求平均。",
  },
  {
    aliases: ["tag", "retweet_cnt", "retweet_rate"],
    difficulty: 2,
    hint: "最近一个月可先找到最大播放日期，再筛选前29天到当天的数据。",
  },
  {
    aliases: ["author", "month", "fans_growth_rate", "total_fans"],
    difficulty: 3,
    hint: "先按创作者和月份统计净增粉，再使用窗口函数累计总粉丝量。",
  },
  {
    aliases: ["tag", "dt", "sum_like_cnt_7d", "max_retweet_cnt_7d"],
    difficulty: 3,
    hint: "先按类别和日期聚合，再使用窗口函数计算近7日点赞量和转发量。",
  },
  {
    aliases: ["video_id", "hot_index"],
    difficulty: 3,
    hint: "热度由完播率、点赞、评论、转发和发布时间共同决定，先聚合每个视频的互动指标。",
  },
  {
    aliases: ["dt", "avg_view_len_sec"],
    difficulty: 1,
    hint: "筛选2021年11月的文章浏览记录，按日期统计总浏览时长和去重用户数。",
  },
  {
    aliases: ["artical_id", "max_uv"],
    difficulty: 3,
    hint: "把进入时间记为+1、离开时间记为-1，再按文章和时间做累计在线人数。",
  },
  {
    aliases: ["dt", "uv_left_rate"],
    difficulty: 3,
    hint: "先找每个用户的首次活跃日期，再判断次日是否仍有活跃。",
  },
  {
    aliases: ["user_grade", "ratio"],
    difficulty: 3,
    hint: "以日志中的最大日期作为当前日期，比较每个用户最近活跃和首次活跃的间隔。",
  },
  {
    aliases: ["dt", "dau", "uv_new_ratio"],
    difficulty: 2,
    hint: "先展开进入和离开日期形成用户日活，再判断该用户当天是否首次活跃。",
  },
  {
    aliases: ["uid", "month", "coin"],
    difficulty: 3,
    hint: "连续签到可以用日期减去行号构造连续分组，再按连续天数计算金币。",
  },
  {
    aliases: ["month", "GMV"],
    difficulty: 1,
    hint: "筛选2021年非取消订单，按月份汇总成交金额。",
  },
  {
    aliases: ["product_id", "ctr", "cart_rate", "payment_rate", "refund_rate"],
    difficulty: 2,
    hint: "按商品统计点击、加购、支付和退款链路指标，注意分母为0时要返回0。",
  },
  {
    aliases: ["product_id", "profit_rate"],
    difficulty: 2,
    hint: "商品毛利率基于售价和进货价计算，店铺汇总可以用UNION ALL补充。",
  },
  {
    aliases: ["product_id", "repurchase_rate"],
    difficulty: 3,
    hint: "先按用户和商品统计购买次数，再计算购买两次及以上用户占比。",
  },
  {
    aliases: ["avg_amount", "avg_cost"],
    difficulty: 3,
    hint: "先找每个用户首单，再筛选10月新客首单计算客单价和获客成本。",
  },
  {
    aliases: ["dt", "sale_rate", "unsale_rate"],
    difficulty: 3,
    hint: "以国庆每天为统计日，计算近7日有销量商品数占店铺商品数的比例。",
  },
  {
    aliases: ["city", "avg_order_num", "avg_income"],
    difficulty: 2,
    hint: "先按司机统计国庆北京接单量和收入，再保留接单不少于3次的司机求平均。",
  },
  {
    aliases: ["driver_id", "avg_grade"],
    difficulty: 2,
    hint: "先找10月有取消订单记录的司机，再统计这些司机的平均评分并补充总体行。",
  },
  {
    aliases: ["city", "driver_id", "avg_grade", "avg_order_num", "avg_mileage"],
    difficulty: 3,
    hint: "先按城市和司机聚合评分、接单量、里程，再用排名函数取每城最高评分司机。",
  },
  {
    aliases: ["dt", "finish_num_7d", "cancel_num_7d"],
    difficulty: 3,
    hint: "先按天统计完成和取消订单数，再在国庆日期上计算近7日日均值。",
  },
  {
    aliases: ["period", "get_car_num", "avg_wait_time", "avg_dispatch_time"],
    difficulty: 2,
    hint: "按叫车时间划分时段，等待接单时间和调度时间需要用时间差换算分钟。",
  },
  {
    aliases: ["city", "max_wait_uv"],
    difficulty: 3,
    hint: "把等车开始和结束事件展开为+1/-1，再按城市累计同时等车人数。",
  },
  {
    aliases: ["style_id", "SPU_num"],
    difficulty: 1,
    hint: "按款式ID分组统计商品数即可。",
  },
  {
    aliases: ["sales_total", "per_trans"],
    difficulty: 1,
    hint: "实际销售额为销售价汇总，客单价为销售额除以下单用户数。",
  },
  {
    aliases: ["discount_rate(%)"],
    difficulty: 1,
    hint: "折扣率等于实际销售额除以吊牌价乘以销量后的总额。",
  },
  {
    aliases: ["style_id", "pin_rate(%)", "sell-through_rate(%)"],
    difficulty: 2,
    hint: "按款式汇总销量、库存和吊牌金额，分别计算动销率和售罄率。",
  },
  {
    aliases: ["user_id", "days_count"],
    difficulty: 3,
    hint: "先对用户购买日期去重，再用日期减行号识别连续购买区间。",
  },
  {
    aliases: ["course_id", "course_name", "sign_rate"],
    difficulty: 1,
    hint: "按课程统计报名人数和浏览人数，报名转化率等于报名数除以浏览数。",
  },
  {
    aliases: ["course_id", "course_name", "online_num"],
    difficulty: 2,
    hint: "统计直播开始时间19:00前已进入且仍满足题目在线条件的用户数。",
  },
  {
    aliases: ["course_name", "avg_Len"],
    difficulty: 1,
    hint: "连接课程表和出勤表，按课程计算平均观看分钟数。",
  },
  {
    aliases: ["course_id", "course_name", "attend_rate"],
    difficulty: 3,
    hint: "先统计报名人数，再判断每个用户是否达到有效出勤时长。",
  },
  {
    aliases: ["course_id", "course_name", "max_num"],
    difficulty: 3,
    hint: "把进入和离开直播间作为在线人数变化事件，按课程累计取最大值。",
  },
  {
    aliases: ["answer_date", "per_num"],
    difficulty: 1,
    hint: "按回答日期分组，回答数除以当天去重答主数。",
  },
  {
    aliases: ["level_cut", "num"],
    difficulty: 2,
    hint: "先筛选高质量回答，再按答主等级区间分组统计。",
  },
  {
    aliases: ["answer_date", "author_id", "answer_cnt"],
    difficulty: 1,
    hint: "筛选11月回答记录，按日期和答主分组，保留回答数不少于3的记录。",
  },
  {
    aliases: ["num"],
    difficulty: 2,
    hint: "先找回答过教育类问题的答主，再统计其中也回答过职场类问题的人数。",
  },
  {
    aliases: ["author_id", "author_level", "days_cnt"],
    difficulty: 3,
    hint: "对每个答主的回答日期去重排序，用日期减排名识别连续回答区间。",
  },
];

const source = fs.readFileSync(sourcePath, "utf8");
const sections = source
  .split(/\n---\n/)
  .map((section) => section.trim())
  .filter(Boolean);

if (sections.length !== levelMeta.length) {
  throw new Error(`Expected ${levelMeta.length} sections, found ${sections.length}`);
}

fs.mkdirSync(outputRoot, { recursive: true });

const stripSuffix = (title) => title.replace(/_牛客题霸_牛客网$/, "").trim();

const extractBetween = (text, startPattern, endPattern) => {
  const start = text.search(startPattern);
  if (start < 0) return "";
  const afterStart = text.slice(start).replace(startPattern, "");
  const end = afterStart.search(endPattern);
  return (end < 0 ? afterStart : afterStart.slice(0, end)).trim();
};

const convertMysqlInputToSqlite = (sql) => {
  let output = sql.trim();

  output = output.replace(/DROP TABLE IF EXISTS\s+([^;]+);/gi, (_, tables) =>
    tables
      .split(",")
      .map((table) => `DROP TABLE IF EXISTS ${table.trim()};`)
      .join("\n")
  );
  output = output.replace(/\b([a-zA-Z_][\w]*)\s+INT\s+PRIMARY KEY\s+AUTO_INCREMENT/gi, "$1 INTEGER PRIMARY KEY AUTOINCREMENT");
  output = output.replace(/\bAUTO_INCREMENT\b/gi, "");
  output = output.replace(/\s+COMMENT\s+'[^']*'/gi, "");
  output = output.replace(/\)\s*CHARACTER SET\s+[^;]+;/gi, ");");
  output = output.replace(/\)\s*CHARSET\s*=\s*[^;]+;/gi, ");");
  output = output.replace(/\)\s*ENGINE\s*=\s*[^;]+;/gi, ");");
  output = output.replace(/\bUNSIGNED\b/gi, "");
  output = output.replace(/`/g, "");
  output = output.replace(/#([^\n]*)/g, "--$1");

  return output.trim() + "\n";
};

const parseOutputRows = (output) =>
  output
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((cell) => cell.trim()));

const sqlLiteral = (value) => {
  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return String(Number(value));
  }
  return `'${value.replace(/'/g, "''")}'`;
};

const quoteAlias = (alias) => `"${alias.replace(/"/g, '""')}"`;

const buildAnswerSql = (aliases, rows) => {
  if (rows.length === 0) {
    throw new Error("Cannot build answer SQL without output rows");
  }
  return rows
    .map((row, rowIndex) => {
      if (row.length !== aliases.length) {
        throw new Error(`Alias count ${aliases.length} does not match row ${row.join("|")}`);
      }
      const cells = row.map((value, colIndex) => {
        const literal = sqlLiteral(value);
        return rowIndex === 0 ? `${literal} AS ${quoteAlias(aliases[colIndex])}` : literal;
      });
      return `${rowIndex === 0 ? "SELECT" : "UNION ALL SELECT"} ${cells.join(", ")}`;
    })
    .join("\n") + ";";
};

const tsString = (value) => JSON.stringify(value);

const firstTableName = (sql) => {
  const match = sql.match(/CREATE TABLE(?:\s+if\s+not\s+exists)?\s+([a-zA-Z_][\w]*)/i);
  return match ? match[1] : "";
};

const imports = [];
const levelExports = [];

sections.forEach((section, index) => {
  const meta = levelMeta[index];
  const title = stripSuffix((section.match(/^#\s+(.+)$/m) || [])[1] || `牛客SQL题 ${index + 1}`);
  const question = extractBetween(section, /## 题目\s*/, /\n## SQL代码/);
  const input = extractBetween(section, /输入：\s*/, /\n复制/);
  const output = extractBetween(section, /输出：\s*/, /\n复制/);
  const originalAnswer = extractBetween(section, /## SQL代码\s*\n\s*```sql\s*/, /```/);
  const rows = parseOutputRows(output);
  const initSQL = convertMysqlInputToSqlite(input);
  const answer = buildAnswerSql(meta.aliases, rows);
  const key = `niuke_sql_${String(index + 1).padStart(3, "0")}`;
  const dirName = `sql${String(index + 1).padStart(3, "0")}`;
  const dir = path.join(outputRoot, dirName);
  const tableName = firstTableName(initSQL);
  const defaultSQL = tableName ? `select * from ${tableName}` : answer;

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "createTable.sql"), initSQL);
  fs.writeFileSync(
    path.join(dir, "README.md"),
    [
      `# ${title}`,
      "",
      "## 题目",
      question.trim(),
      "",
      "## 输出字段",
      meta.aliases.map((alias) => `- \`${alias}\``).join("\n"),
      "",
      "## SQLite 说明",
      "本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。",
      "",
      "## 参考 SQL（MySQL 原题写法）",
      "```sql",
      originalAnswer.trim(),
      "```",
      "",
    ].join("\n")
  );
  fs.writeFileSync(
    path.join(dir, "index.ts"),
    [
      'import md from "./README.md?raw";',
      'import sql from "./createTable.sql?raw";',
      "",
      "export default {",
      `  key: ${tsString(key)},`,
      `  title: ${tsString(title)},`,
      "  initSQL: sql,",
      "  content: md,",
      `  defaultSQL: ${tsString(defaultSQL)},`,
      `  answer: ${tsString(answer)},`,
      `  hint: ${tsString(meta.hint)},`,
      '  type: "custom",',
      `  difficulty: ${meta.difficulty},`,
      "} as LevelType;",
      "",
    ].join("\n")
  );

  const importName = `niukeSql${String(index + 1).padStart(3, "0")}`;
  imports.push(`import ${importName} from "./${dirName}";`);
  levelExports.push(`  ${importName},`);
});

fs.writeFileSync(
  path.join(outputRoot, "index.ts"),
  [
    ...imports,
    "",
    "const niukeSqlLevels: LevelType[] = [",
    ...levelExports,
    "];",
    "",
    "export default niukeSqlLevels;",
    "",
  ].join("\n")
);

console.log(`Generated ${sections.length} Niuke SQL levels in ${path.relative(root, outputRoot)}`);
