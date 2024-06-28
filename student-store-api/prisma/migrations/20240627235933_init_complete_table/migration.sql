-- DropForeignKey
ALTER TABLE "Order_Item" DROP CONSTRAINT "Order_Item_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Order_Item" DROP CONSTRAINT "Order_Item_product_id_fkey";

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
