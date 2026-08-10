import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "cms"."home_page_experience_categories" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"video_id" uuid,
	"poster_id" uuid
  );

  CREATE TABLE "cms"."_home_page_v_version_experience_categories" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"video_id" uuid,
	"poster_id" uuid,
	"_uuid" varchar
  );

  ALTER TABLE "cms"."home_page" ADD COLUMN "experience_eyebrow" varchar DEFAULT 'Your night';
  ALTER TABLE "cms"."home_page" ADD COLUMN "experience_title" varchar DEFAULT 'Everything in its place.';
  ALTER TABLE "cms"."_home_page_v" ADD COLUMN "version_experience_eyebrow" varchar DEFAULT 'Your night';
  ALTER TABLE "cms"."_home_page_v" ADD COLUMN "version_experience_title" varchar DEFAULT 'Everything in its place.';
  ALTER TABLE "cms"."home_page_experience_categories" ADD CONSTRAINT "home_page_experience_categories_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_page_experience_categories" ADD CONSTRAINT "home_page_experience_categories_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_page_experience_categories" ADD CONSTRAINT "home_page_experience_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v_version_experience_categories" ADD CONSTRAINT "_home_page_v_version_experience_categories_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v_version_experience_categories" ADD CONSTRAINT "_home_page_v_version_experience_categories_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v_version_experience_categories" ADD CONSTRAINT "_home_page_v_version_experience_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_experience_categories_order_idx" ON "cms"."home_page_experience_categories" USING btree ("_order");
  CREATE INDEX "home_page_experience_categories_parent_id_idx" ON "cms"."home_page_experience_categories" USING btree ("_parent_id");
  CREATE INDEX "home_page_experience_categories_video_idx" ON "cms"."home_page_experience_categories" USING btree ("video_id");
  CREATE INDEX "home_page_experience_categories_poster_idx" ON "cms"."home_page_experience_categories" USING btree ("poster_id");
  CREATE INDEX "_home_page_v_version_experience_categories_order_idx" ON "cms"."_home_page_v_version_experience_categories" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_experience_categories_parent_id_idx" ON "cms"."_home_page_v_version_experience_categories" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_experience_categories_video_idx" ON "cms"."_home_page_v_version_experience_categories" USING btree ("video_id");
  CREATE INDEX "_home_page_v_version_experience_categories_poster_idx" ON "cms"."_home_page_v_version_experience_categories" USING btree ("poster_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cms"."home_page_experience_categories" CASCADE;
  DROP TABLE "cms"."_home_page_v_version_experience_categories" CASCADE;
  ALTER TABLE "cms"."home_page" DROP COLUMN "experience_eyebrow";
  ALTER TABLE "cms"."home_page" DROP COLUMN "experience_title";
  ALTER TABLE "cms"."_home_page_v" DROP COLUMN "version_experience_eyebrow";
  ALTER TABLE "cms"."_home_page_v" DROP COLUMN "version_experience_title";`)
}
