// --- 題目一：變數宣告型別定義 ---
// 說明：請為以下變數補上正確型別（數字、字串、布林、字串陣列、帶型別的物件）。
// 目標：能直接通過型別檢查與基本值檢查。

export const plantId : number/* TODO: 型別 */ = 101;
export const plantName : string/* TODO: 型別 */ = "琴葉榕（Fiddle Leaf Fig）";
export const isAvailable: boolean /* TODO: 型別 */ = true;
export const tags: string[] /* TODO: 型別 */ = ["大型植栽", "室內明亮散射光"];
export const plant :{ id: number, name: string, price: number}/* TODO: 物件型別 */ = { id: 101, name: "琴葉榕", price: 2500 };
export const cart :{ sku: string, name: string, qty: number, price: number, potColor?: string}[]/* TODO: 陣列包物件的型別定義 > */ = [
  { sku: "PLANT-1001", name: "虎尾蘭", qty: 2, price: 480 },
  { sku: "PLANT-2001", name: "龜背芋", qty: 1, price: 1200, potColor: "白" },
];

// --- 題目二：Enum（定義 & 反向映射） ---
// 說明：請定義 PlantCategory Enum，並示範反向映射。
// 目標：理解 Enum 定義與反向映射的寫法。

export enum PlantCategory {
  LargePlant,
  TabletopPlant,
  HangingPlant,
  Succulent
}
// export const catKeyName: string = PlantCategory[/* TODO: 取得 LargePlant 的數值 */ 0];
export const catKeyName: string = PlantCategory[PlantCategory.LargePlant];
console.log(`catKeyName`,catKeyName);


// --- 題目三：type（& 組合） ---
// 說明：請用 type 定義 BasicPlant 與 StockInfo，再用 & 組合為 OnShelfPlant，建立範例變數。
// 目標：理解 type 宣告與交叉型別的寫法。

export type BasicPlant = {id:number; name: string; price: number}/* TODO: { id: 型別; name: 型別; price: 型別 } */ ;
export type StockInfo = {sku:string; quantity:number}  /* TODO: { sku: 型別; quantity: 型別 } */ ;
export type OnShelfPlant = BasicPlant & StockInfo/* TODO: BasicPlant, StockInfo 組合 */ ;

export const snakePlant : OnShelfPlant  = {
  id: 2,
  name: "虎尾蘭",
  price: 480,
  sku: "PLANT-1001",
  quantity: 42,
};


// --- 題目四：interface（extends 組合） ---
// 說明：定義 Price 與 Shippable，PlantItem 需 extends 兩者並包含 id/name。
// 目標：理解介面擴充多重介面的寫法。
export interface Price{ price: number; currency: "TWD" | "USD"} 
// { /* TODO: price: 型別; currency:"TWD"|"USD" */ }
export interface Shippable  { weightKg: number ; shipForm: string}
//  { /* TODO: weightKg: 型別; shipFrom: 型別 */ }
// export interface PlantItem 組合 Price, Shippable 並包含 id/name
export interface PlantItem extends Price, Shippable { id: number; name: string }
export const fiddleLeafFig  : PlantItem = /* TODO: PlantItem */  {
  id: 101,
  name: "琴葉榕",
  price: 2500,
  currency: "TWD",
  weightKg: 8.2,
  shipForm: "Taipei",
};


// --- 題目五：函式定義（以 type 標註參數與回傳） ---
// 說明：定義 CalcTotalFn，計算 items 小計，若有 coupon 則折抵（percent/cash）。
// 目標：以 type 定義函式型別並實作。
export type CartItem = { price: number; qty: number };
export type Coupon = { type: "percent" | "cash"; amount: number };
export type CalcTotalFn =  ( items: CartItem[], coupon?: Coupon) => number /* TODO: (參數型別) => 型別 */ ;

export const calcTotal:CalcTotalFn /* TODO: CalcTotalFn */ = (items, coupon) => {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  if (!coupon) return subtotal; 
  if (coupon.type === "percent") return Math.max(0, Math.round(subtotal * (1 - coupon.amount / 100)));
  return Math.max(0, subtotal - coupon.amount);
};


// --- 題目六：Generics + API 應用（使用 axios)  ---
// 說明：import axios 與 AxiosResponse，定義 PlantDTO，實作 fetchPlants。
// API: https://fakestoreapi.com/products
// 目標：理解泛型定義與應用。
import axios from 'axios'; /* TODO */
import type { AxiosResponse } from 'axios'; 
export type PlantDTO = { 
  id: number; 
  title: string; 
  price: number; 
  category: string; 
};

export const fetchPlants  = async () : Promise<AxiosResponse<PlantDTO[]>> => {
  return axios.get('https://fakestoreapi.com/products');
}
console.log(await fetchPlants());


// --- 題目七：Required、Partial ---
// 說明：updatePlant(input) 接受部分更新，實際回傳需是 Required<PlantBase>。
// 目標：掌握 Partial/Required 的互補與回傳保證。
export type PlantBase = { id: number; name: string; price: number; description?: string };

export function updatePlant(input: /* TODO */ Partial<PlantBase>): /* TODO */ Required<PlantBase> {
  const existing: Required<PlantBase>  = { id: 1, name: "虎尾蘭", price: 480, description: "耐陰、淨化空氣" };
  const merged = { ...existing, ...input };
  return {
    id: merged.id,
    name: merged.name,
    price: merged.price,
    description: merged.description ?? "",
  };
}


// --- 題目八：Record ---
// 說明：用 Record 表示庫存表。
// 目標：以字串鍵對應到嚴格結構。
export type Inventory =Record<PLANT-${string}, number>;
export const inventory:Inventory = {
  "PLANT-1001": 42,
  "PLANT-2001": 8,
};

// --- 題目九：Pick、Omit ---
// 說明：type PlantItem 由第四題定義，請用 Pick/Omit 建立兩個新型別。
// 目標：理解 Pick/Omit 的用法與差異。
// 需求：
// 1) CartPlant：只需 id/name/price
// 2) PublicPlant：移除重量與出貨地
export type CartPlant = Pick<PlantItem, "id" | "name" | "price">
export type PublicPlant = Omit<PlantItem, "weightKg" | "shipForm">;

export const cartPlant :CartPlant = { id: 101, name: "琴葉榕", price: 2500 };
export const publicPlant :PublicPlant = { id: 101, name: "琴葉榕", price: 2500, currency: "TWD" };


// --- 題目十：綜合練習 ---
// 說明：這是一個後台新增商品的功能，請將以下需求用 TypeScript 實作。
/* 1️⃣ 定義 type Product
    產品資料結構如下：
    - id: 字串
    - title: 字串
    - category: 字串
    - description: 字串
    - origin_price: 數字
    - price: 數字
    - is_enabled: 布林
    - unit: 字串 
    - imageUrl: 字串
    - imagesUrl: 字串陣列（非必要）
*/
type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  origin_price: number;
  price: number;
  is_enabled: boolean;
  unit: string;
  imageUrl: string;
  imagesUrl?: string[];
}
/*
2️⃣ 定義 type CreateProduct
由 Product 衍生，但不包含 id（使用 Omit）
*/
type CreateProduct = Omit<Product, "id">
/*
3️⃣ 定義 type UpdateProduct
由 Product 衍生，id, title 必須有，其餘皆可選（使用 Partial 與 Omit）
*/
// & 前面的是必須要有的 , &後面是可選的
type UpdateProduct = {id:string,title:string} & Partial<Omit<Product, "id" | "title">>
/*
4️⃣ 實作函式 submitProduct(type, product)
參數說明：
- type 僅能是 "create" 或 "update"
- 若 type === "create"，參數型別應為 CreateProduct
- 若 type === "update"，參數型別應為 UpdateProduct
函式回傳字串：
create → "新增商品成功：${product.title}"
update → "更新商品成功：${product.id}"
*/
export const submitProduct = (
  type: "create" | "update", 
  product: CreateProduct | UpdateProduct
): string => {
  if (type === "create") {
    // TypeScript 會自動推斷 product 是 CreateProduct
    return `新增商品成功:${(product as CreateProduct).title}`;
  } else {
    // TypeScript 會自動推斷 product 是 UpdateProduct
    return `更新商品成功:${(product as UpdateProduct).id}`;
  }
};