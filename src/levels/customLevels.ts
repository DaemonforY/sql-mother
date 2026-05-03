import adventurer from "./custom/冒险者和金币";
import magicScores from "./custom/魔法学院";
import waveChicken from "./custom/大浪淘鸡";
import ecommerceAnalysis from "./custom/码上淘宝";
import gameDataAnalysis from "./custom/王者农药大数据";
import financialTransactionAnalysis from "./custom/金牛投资";
import socialMediaAnalysis from "./custom/朋友圈的秘密";
import logisticsDeliveryAnalysis from "./custom/快递江湖";
import movieBoxOfficeAnalysis from "./custom/光影票房王";
import restaurantBusinessAnalysis from "./custom/美食帝国";
import bookSalesAnalysis from "./custom/书香满园";
import hospitalAppointmentAnalysis from "./custom/白衣天使";
import deliveryPerformanceAnalysis from "./custom/极速达人";
import stockTradingAnalysis from "./custom/华尔街风云";
import ecommerceUserBehaviorAnalysis from "./custom/数据淘金客";
import continueLoginDays from "./custom/连续登录天数";
import nextDayRetention from "./custom/用户次日留存";
import categorySalesTopN from "./custom/品类销售TopN";
import repurchaseUserAnalysis from "./custom/复购用户分析";
import orderConversionFunnel from "./custom/订单转化漏斗";
import secondHighestSalary from "./custom/薪资第二高";
import departmentHighestSalary from "./custom/部门最高薪资";
import silentUserRecall from "./custom/用户沉默召回";

/**
 * 自定义关卡列表
 */
const customLevels: LevelType[] = [
  adventurer, 
  magicScores, 
  waveChicken,
  ecommerceAnalysis,
  gameDataAnalysis,
  financialTransactionAnalysis,
  socialMediaAnalysis,
  logisticsDeliveryAnalysis,
  movieBoxOfficeAnalysis,
  restaurantBusinessAnalysis,
  bookSalesAnalysis,
  hospitalAppointmentAnalysis,
  deliveryPerformanceAnalysis,
  stockTradingAnalysis,
  ecommerceUserBehaviorAnalysis,
  continueLoginDays,
  nextDayRetention,
  categorySalesTopN,
  repurchaseUserAnalysis,
  orderConversionFunnel,
  secondHighestSalary,
  departmentHighestSalary,
  silentUserRecall
];

export default customLevels;
