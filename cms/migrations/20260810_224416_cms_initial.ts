import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE SCHEMA IF NOT EXISTS "cms";
  CREATE TYPE "cms"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "cms"."enum_media_orientation" AS ENUM('vertical', 'horizontal', 'square');
  CREATE TYPE "cms"."enum_enquiries_status" AS ENUM('new', 'contacted', 'proposal', 'confirmed', 'closed');
  CREATE TYPE "cms"."enum_enquiries_event_details_event_type" AS ENUM('debs', 'ty_ball');
  CREATE TYPE "cms"."enum_enquiries_event_details_attendance_band" AS ENUM('50_80', '80_120', '120_150', 'more_than_150');
  CREATE TYPE "cms"."enum_enquiries_notification_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TYPE "cms"."enum__enquiries_v_version_status" AS ENUM('new', 'contacted', 'proposal', 'confirmed', 'closed');
  CREATE TYPE "cms"."enum__enquiries_v_version_event_details_event_type" AS ENUM('debs', 'ty_ball');
  CREATE TYPE "cms"."enum__enquiries_v_version_event_details_attendance_band" AS ENUM('50_80', '80_120', '120_150', 'more_than_150');
  CREATE TYPE "cms"."enum__enquiries_v_version_notification_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TYPE "cms"."enum_pages_slug" AS ENUM('how-it-works', 'cost-guide', 'parents-schools', 'for-committees', 'enquire');
  CREATE TYPE "cms"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum__pages_v_version_slug" AS ENUM('how-it-works', 'cost-guide', 'parents-schools', 'for-committees', 'enquire');
  CREATE TYPE "cms"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum_faqs_page" AS ENUM('home', 'parents-schools', 'for-committees', 'cost-guide');
  CREATE TYPE "cms"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum__faqs_v_version_page" AS ENUM('home', 'parents-schools', 'for-committees', 'cost-guide');
  CREATE TYPE "cms"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum_galleries_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum__galleries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum_venues_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum__venues_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum_home_page_highlights_icon" AS ENUM('venue', 'contact', 'shield');
  CREATE TYPE "cms"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "cms"."enum__home_page_v_version_highlights_icon" AS ENUM('venue', 'contact', 'shield');
  CREATE TYPE "cms"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "cms"."users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "cms"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"role" "cms"."enum_users_role" DEFAULT 'editor' NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "cms"."media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"alt" varchar NOT NULL,
	"caption" varchar,
	"credit" varchar,
	"orientation" "cms"."enum_media_orientation" DEFAULT 'vertical' NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_wide_url" varchar,
	"sizes_wide_width" numeric,
	"sizes_wide_height" numeric,
	"sizes_wide_mime_type" varchar,
	"sizes_wide_filesize" numeric,
	"sizes_wide_filename" varchar,
	"sizes_social_url" varchar,
	"sizes_social_width" numeric,
	"sizes_social_height" numeric,
	"sizes_social_mime_type" varchar,
	"sizes_social_filesize" numeric,
	"sizes_social_filename" varchar
  );

  CREATE TABLE "cms"."enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "cms"."enum_enquiries_status" DEFAULT 'new' NOT NULL,
	"assigned_to_id" uuid,
	"last_contacted_at" timestamp(3) with time zone,
	"internal_notes" varchar,
	"contact_first_name" varchar,
	"contact_last_name" varchar,
	"contact_contact_name" varchar NOT NULL,
	"contact_email" varchar NOT NULL,
	"contact_phone" varchar NOT NULL,
	"contact_name" varchar NOT NULL,
	"school_details_school" varchar NOT NULL,
	"school_details_county" varchar NOT NULL,
	"school_details_joining_schools" varchar,
	"school_details_year_size" numeric,
	"school" varchar NOT NULL,
	"county" varchar NOT NULL,
	"event_details_event_type" "cms"."enum_enquiries_event_details_event_type",
	"event_details_preferred_date" timestamp(3) with time zone,
	"event_details_preferred_location" varchar,
	"event_details_attendance_band" "cms"."enum_enquiries_event_details_attendance_band",
	"event_details_estimated_attendance" numeric NOT NULL,
	"event_details_message" varchar,
	"preferred_date" timestamp(3) with time zone,
	"source_referral_source" varchar,
	"source_referral_other" varchar,
	"source_landing_page" varchar,
	"source_referrer" varchar,
	"source_utm_source" varchar,
	"source_utm_medium" varchar,
	"source_utm_campaign" varchar,
	"source_utm_content" varchar,
	"source_utm_term" varchar,
	"source_gclid" varchar,
	"source_fbclid" varchar,
	"privacy_notice_acknowledged_at" timestamp(3) with time zone NOT NULL,
	"privacy_marketing_consent" boolean DEFAULT false NOT NULL,
	"notification_status" "cms"."enum_enquiries_notification_status" DEFAULT 'pending' NOT NULL,
	"notification_error" varchar,
	"request_hash" varchar NOT NULL,
	"legacy_created_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "cms"."_enquiries_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"version_status" "cms"."enum__enquiries_v_version_status" DEFAULT 'new' NOT NULL,
	"version_assigned_to_id" uuid,
	"version_last_contacted_at" timestamp(3) with time zone,
	"version_internal_notes" varchar,
	"version_contact_first_name" varchar,
	"version_contact_last_name" varchar,
	"version_contact_contact_name" varchar NOT NULL,
	"version_contact_email" varchar NOT NULL,
	"version_contact_phone" varchar NOT NULL,
	"version_contact_name" varchar NOT NULL,
	"version_school_details_school" varchar NOT NULL,
	"version_school_details_county" varchar NOT NULL,
	"version_school_details_joining_schools" varchar,
	"version_school_details_year_size" numeric,
	"version_school" varchar NOT NULL,
	"version_county" varchar NOT NULL,
	"version_event_details_event_type" "cms"."enum__enquiries_v_version_event_details_event_type",
	"version_event_details_preferred_date" timestamp(3) with time zone,
	"version_event_details_preferred_location" varchar,
	"version_event_details_attendance_band" "cms"."enum__enquiries_v_version_event_details_attendance_band",
	"version_event_details_estimated_attendance" numeric NOT NULL,
	"version_event_details_message" varchar,
	"version_preferred_date" timestamp(3) with time zone,
	"version_source_referral_source" varchar,
	"version_source_referral_other" varchar,
	"version_source_landing_page" varchar,
	"version_source_referrer" varchar,
	"version_source_utm_source" varchar,
	"version_source_utm_medium" varchar,
	"version_source_utm_campaign" varchar,
	"version_source_utm_content" varchar,
	"version_source_utm_term" varchar,
	"version_source_gclid" varchar,
	"version_source_fbclid" varchar,
	"version_privacy_notice_acknowledged_at" timestamp(3) with time zone NOT NULL,
	"version_privacy_marketing_consent" boolean DEFAULT false NOT NULL,
	"version_notification_status" "cms"."enum__enquiries_v_version_notification_status" DEFAULT 'pending' NOT NULL,
	"version_notification_error" varchar,
	"version_request_hash" varchar NOT NULL,
	"version_legacy_created_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "cms"."pages_sections_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"text" varchar
  );

  CREATE TABLE "cms"."pages_sections" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"key" varchar,
	"eyebrow" varchar,
	"title" varchar,
	"text" varchar
  );

  CREATE TABLE "cms"."pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"slug" "cms"."enum_pages_slug",
	"hero_eyebrow" varchar,
	"hero_title" varchar,
	"hero_intro" varchar,
	"hero_media_id" uuid,
	"call_to_action_eyebrow" varchar,
	"call_to_action_title" varchar,
	"call_to_action_text" varchar,
	"call_to_action_button_label" varchar,
	"call_to_action_button_link" varchar,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_image_id" uuid,
	"seo_canonical_path" varchar,
	"seo_no_index" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "cms"."enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "cms"."_pages_v_version_sections_items" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"text" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_pages_v_version_sections" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar,
	"eyebrow" varchar,
	"title" varchar,
	"text" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_pages_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"version_title" varchar,
	"version_slug" "cms"."enum__pages_v_version_slug",
	"version_hero_eyebrow" varchar,
	"version_hero_title" varchar,
	"version_hero_intro" varchar,
	"version_hero_media_id" uuid,
	"version_call_to_action_eyebrow" varchar,
	"version_call_to_action_title" varchar,
	"version_call_to_action_text" varchar,
	"version_call_to_action_button_label" varchar,
	"version_call_to_action_button_link" varchar,
	"version_seo_title" varchar,
	"version_seo_description" varchar,
	"version_seo_image_id" uuid,
	"version_seo_canonical_path" varchar,
	"version_seo_no_index" boolean DEFAULT false,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "cms"."enum__pages_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "cms"."faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"_order" varchar,
	"question" varchar,
	"answer" varchar,
	"page" "cms"."enum_faqs_page" DEFAULT 'home',
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "cms"."enum_faqs_status" DEFAULT 'draft'
  );

  CREATE TABLE "cms"."_faqs_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"version__order" varchar,
	"version_question" varchar,
	"version_answer" varchar,
	"version_page" "cms"."enum__faqs_v_version_page" DEFAULT 'home',
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "cms"."enum__faqs_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "cms"."galleries_items" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"media_id" uuid,
	"caption" varchar
  );

  CREATE TABLE "cms"."galleries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"slug" varchar,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "cms"."enum_galleries_status" DEFAULT 'draft'
  );

  CREATE TABLE "cms"."_galleries_v_version_items" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_id" uuid,
	"caption" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_galleries_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"version_title" varchar,
	"version_slug" varchar,
	"version_description" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "cms"."enum__galleries_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "cms"."venues_features" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar
  );

  CREATE TABLE "cms"."venues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"slug" varchar,
	"county" varchar,
	"area" varchar,
	"summary" varchar,
	"description" jsonb,
	"hero_media_id" uuid,
	"gallery_id" uuid,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_image_id" uuid,
	"seo_canonical_path" varchar,
	"seo_no_index" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "cms"."enum_venues_status" DEFAULT 'draft'
  );

  CREATE TABLE "cms"."_venues_v_version_features" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_venues_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"version_title" varchar,
	"version_slug" varchar,
	"version_county" varchar,
	"version_area" varchar,
	"version_summary" varchar,
	"version_description" jsonb,
	"version_hero_media_id" uuid,
	"version_gallery_id" uuid,
	"version_seo_title" varchar,
	"version_seo_description" varchar,
	"version_seo_image_id" uuid,
	"version_seo_canonical_path" varchar,
	"version_seo_no_index" boolean DEFAULT false,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "cms"."enum__venues_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "cms"."events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"slug" varchar,
	"event_date" timestamp(3) with time zone,
	"county" varchar,
	"venue_id" uuid,
	"summary" varchar,
	"story" jsonb,
	"hero_media_id" uuid,
	"gallery_id" uuid,
	"featured" boolean DEFAULT false,
	"photo_consent_confirmed" boolean DEFAULT false,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_image_id" uuid,
	"seo_canonical_path" varchar,
	"seo_no_index" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "cms"."enum_events_status" DEFAULT 'draft'
  );

  CREATE TABLE "cms"."_events_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"version_title" varchar,
	"version_slug" varchar,
	"version_event_date" timestamp(3) with time zone,
	"version_county" varchar,
	"version_venue_id" uuid,
	"version_summary" varchar,
	"version_story" jsonb,
	"version_hero_media_id" uuid,
	"version_gallery_id" uuid,
	"version_featured" boolean DEFAULT false,
	"version_photo_consent_confirmed" boolean DEFAULT false,
	"version_seo_title" varchar,
	"version_seo_description" varchar,
	"version_seo_image_id" uuid,
	"version_seo_canonical_path" varchar,
	"version_seo_no_index" boolean DEFAULT false,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "cms"."enum__events_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "cms"."payload_kv" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
  );

  CREATE TABLE "cms"."payload_locked_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "cms"."payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" uuid NOT NULL,
	"path" varchar NOT NULL,
	"users_id" uuid,
	"media_id" uuid,
	"enquiries_id" uuid,
	"pages_id" uuid,
	"faqs_id" uuid,
	"galleries_id" uuid,
	"venues_id" uuid,
	"events_id" uuid
  );

  CREATE TABLE "cms"."payload_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "cms"."payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" uuid NOT NULL,
	"path" varchar NOT NULL,
	"users_id" uuid
  );

  CREATE TABLE "cms"."payload_migrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "cms"."site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_name" varchar DEFAULT 'TYBalls.ie' NOT NULL,
	"site_description" varchar DEFAULT 'TY Ball venue, food, entertainment, security and event coordination across Ireland from the team behind DebsGuru.ie.' NOT NULL,
	"contact_email" varchar DEFAULT 'info@debsguru.ie' NOT NULL,
	"whatsapp_number" varchar DEFAULT '353873431732' NOT NULL,
	"whatsapp_label" varchar DEFAULT 'Message us on WhatsApp' NOT NULL,
	"social_links_instagram" varchar DEFAULT 'https://www.instagram.com/debsguru.ie/' NOT NULL,
	"social_links_facebook" varchar DEFAULT 'https://www.facebook.com/debsguru.ie/' NOT NULL,
	"social_links_tiktok" varchar DEFAULT 'https://www.tiktok.com/@debsguru.ie' NOT NULL,
	"social_links_debs_guru" varchar DEFAULT 'https://debsguru.ie/' NOT NULL,
	"footer_statement" varchar DEFAULT 'TYBalls.ie is brought to you by the team behind DebsGuru.ie.' NOT NULL,
	"default_social_image_id" uuid,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "cms"."home_page_highlights" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "cms"."enum_home_page_highlights_icon",
	"title" varchar,
	"text" varchar
  );

  CREATE TABLE "cms"."home_page_steps" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"text" varchar
  );

  CREATE TABLE "cms"."home_page_parent_guidance_points" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar
  );

  CREATE TABLE "cms"."home_page" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hero_eyebrow" varchar DEFAULT 'TY Ball organisers across Ireland',
	"hero_title" varchar DEFAULT 'Planning a TY Ball?',
	"hero_intro" varchar DEFAULT 'A memorable night for your guests. One clear plan for you.',
	"hero_primary_button_label" varchar DEFAULT 'Booking Enquiry Form',
	"hero_primary_button_link" varchar DEFAULT '/enquire',
	"hero_secondary_button_label" varchar DEFAULT 'See how it works',
	"hero_secondary_button_link" varchar DEFAULT '/how-it-works',
	"proof_eyebrow" varchar DEFAULT 'Proven experience',
	"proof_title" varchar DEFAULT 'Over 10 years.',
	"proof_text" varchar DEFAULT 'TYBalls.ie is brought to you by the team behind DebsGuru.ie, with thousands of students enjoying our events across Ireland.',
	"proof_gallery_id" uuid,
	"parent_guidance_eyebrow" varchar DEFAULT 'For parents and schools',
	"parent_guidance_title" varchar DEFAULT 'Clear for everyone.',
	"final_call_to_action_eyebrow" varchar DEFAULT 'Start with the basics',
	"final_call_to_action_title" varchar DEFAULT 'Booking Enquiry Form',
	"final_call_to_action_text" varchar DEFAULT 'Sending an enquiry does not reserve a date or create a booking.',
	"final_call_to_action_button_label" varchar DEFAULT 'Open the form',
	"final_call_to_action_button_link" varchar DEFAULT '/enquire',
	"seo_title" varchar DEFAULT 'TY Ball Organisers Ireland | TYBalls.ie by DebsGuru',
	"seo_description" varchar DEFAULT 'Plan a TY Ball in Ireland with venue sourcing, food, entertainment, security and staffed event coordination from the team behind DebsGuru.ie.',
	"seo_image_id" uuid,
	"seo_canonical_path" varchar DEFAULT '/',
	"seo_no_index" boolean DEFAULT false,
	"_status" "cms"."enum_home_page_status" DEFAULT 'draft',
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "cms"."_home_page_v_version_highlights" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"icon" "cms"."enum__home_page_v_version_highlights_icon",
	"title" varchar,
	"text" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_home_page_v_version_steps" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"text" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_home_page_v_version_parent_guidance_points" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "cms"."_home_page_v" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version_hero_eyebrow" varchar DEFAULT 'TY Ball organisers across Ireland',
	"version_hero_title" varchar DEFAULT 'Planning a TY Ball?',
	"version_hero_intro" varchar DEFAULT 'A memorable night for your guests. One clear plan for you.',
	"version_hero_primary_button_label" varchar DEFAULT 'Booking Enquiry Form',
	"version_hero_primary_button_link" varchar DEFAULT '/enquire',
	"version_hero_secondary_button_label" varchar DEFAULT 'See how it works',
	"version_hero_secondary_button_link" varchar DEFAULT '/how-it-works',
	"version_proof_eyebrow" varchar DEFAULT 'Proven experience',
	"version_proof_title" varchar DEFAULT 'Over 10 years.',
	"version_proof_text" varchar DEFAULT 'TYBalls.ie is brought to you by the team behind DebsGuru.ie, with thousands of students enjoying our events across Ireland.',
	"version_proof_gallery_id" uuid,
	"version_parent_guidance_eyebrow" varchar DEFAULT 'For parents and schools',
	"version_parent_guidance_title" varchar DEFAULT 'Clear for everyone.',
	"version_final_call_to_action_eyebrow" varchar DEFAULT 'Start with the basics',
	"version_final_call_to_action_title" varchar DEFAULT 'Booking Enquiry Form',
	"version_final_call_to_action_text" varchar DEFAULT 'Sending an enquiry does not reserve a date or create a booking.',
	"version_final_call_to_action_button_label" varchar DEFAULT 'Open the form',
	"version_final_call_to_action_button_link" varchar DEFAULT '/enquire',
	"version_seo_title" varchar DEFAULT 'TY Ball Organisers Ireland | TYBalls.ie by DebsGuru',
	"version_seo_description" varchar DEFAULT 'Plan a TY Ball in Ireland with venue sourcing, food, entertainment, security and staffed event coordination from the team behind DebsGuru.ie.',
	"version_seo_image_id" uuid,
	"version_seo_canonical_path" varchar DEFAULT '/',
	"version_seo_no_index" boolean DEFAULT false,
	"version__status" "cms"."enum__home_page_v_version_status" DEFAULT 'draft',
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  ALTER TABLE "cms"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."enquiries" ADD CONSTRAINT "enquiries_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "cms"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_enquiries_v" ADD CONSTRAINT "_enquiries_v_parent_id_enquiries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."enquiries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_enquiries_v" ADD CONSTRAINT "_enquiries_v_version_assigned_to_id_users_id_fk" FOREIGN KEY ("version_assigned_to_id") REFERENCES "cms"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."pages_sections_items" ADD CONSTRAINT "pages_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pages_sections" ADD CONSTRAINT "pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_pages_v_version_sections_items" ADD CONSTRAINT "_pages_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pages_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pages_v_version_sections" ADD CONSTRAINT "_pages_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."galleries_items" ADD CONSTRAINT "galleries_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."galleries_items" ADD CONSTRAINT "galleries_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_galleries_v_version_items" ADD CONSTRAINT "_galleries_v_version_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_galleries_v_version_items" ADD CONSTRAINT "_galleries_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_galleries_v" ADD CONSTRAINT "_galleries_v_parent_id_galleries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."venues_features" ADD CONSTRAINT "venues_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."venues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."venues" ADD CONSTRAINT "venues_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."venues" ADD CONSTRAINT "venues_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."venues" ADD CONSTRAINT "venues_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_venues_v_version_features" ADD CONSTRAINT "_venues_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_venues_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_venues_v" ADD CONSTRAINT "_venues_v_parent_id_venues_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."venues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_venues_v" ADD CONSTRAINT "_venues_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_venues_v" ADD CONSTRAINT "_venues_v_version_gallery_id_galleries_id_fk" FOREIGN KEY ("version_gallery_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_venues_v" ADD CONSTRAINT "_venues_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."events" ADD CONSTRAINT "events_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "cms"."venues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."events" ADD CONSTRAINT "events_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."events" ADD CONSTRAINT "events_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."events" ADD CONSTRAINT "events_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_events_v" ADD CONSTRAINT "_events_v_version_venue_id_venues_id_fk" FOREIGN KEY ("version_venue_id") REFERENCES "cms"."venues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_events_v" ADD CONSTRAINT "_events_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_events_v" ADD CONSTRAINT "_events_v_version_gallery_id_galleries_id_fk" FOREIGN KEY ("version_gallery_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_events_v" ADD CONSTRAINT "_events_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "cms"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "cms"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "cms"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "cms"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venues_fk" FOREIGN KEY ("venues_id") REFERENCES "cms"."venues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "cms"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings" ADD CONSTRAINT "site_settings_default_social_image_id_media_id_fk" FOREIGN KEY ("default_social_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_page_highlights" ADD CONSTRAINT "home_page_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_page_steps" ADD CONSTRAINT "home_page_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_page_parent_guidance_points" ADD CONSTRAINT "home_page_parent_guidance_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_page" ADD CONSTRAINT "home_page_proof_gallery_id_galleries_id_fk" FOREIGN KEY ("proof_gallery_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_page" ADD CONSTRAINT "home_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v_version_highlights" ADD CONSTRAINT "_home_page_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v_version_steps" ADD CONSTRAINT "_home_page_v_version_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v_version_parent_guidance_points" ADD CONSTRAINT "_home_page_v_version_parent_guidance_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v" ADD CONSTRAINT "_home_page_v_version_proof_gallery_id_galleries_id_fk" FOREIGN KEY ("version_proof_gallery_id") REFERENCES "cms"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_home_page_v" ADD CONSTRAINT "_home_page_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "cms"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "cms"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "cms"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "cms"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "cms"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "cms"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "cms"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "cms"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "cms"."media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_wide_sizes_wide_filename_idx" ON "cms"."media" USING btree ("sizes_wide_filename");
  CREATE INDEX "media_sizes_social_sizes_social_filename_idx" ON "cms"."media" USING btree ("sizes_social_filename");
  CREATE INDEX "enquiries_status_idx" ON "cms"."enquiries" USING btree ("status");
  CREATE INDEX "enquiries_assigned_to_idx" ON "cms"."enquiries" USING btree ("assigned_to_id");
  CREATE INDEX "enquiries_contact_contact_contact_name_idx" ON "cms"."enquiries" USING btree ("contact_contact_name");
  CREATE INDEX "enquiries_contact_contact_email_idx" ON "cms"."enquiries" USING btree ("contact_email");
  CREATE INDEX "enquiries_contact_name_idx" ON "cms"."enquiries" USING btree ("contact_name");
  CREATE INDEX "enquiries_school_details_school_details_school_idx" ON "cms"."enquiries" USING btree ("school_details_school");
  CREATE INDEX "enquiries_school_details_school_details_county_idx" ON "cms"."enquiries" USING btree ("school_details_county");
  CREATE INDEX "enquiries_school_idx" ON "cms"."enquiries" USING btree ("school");
  CREATE INDEX "enquiries_county_idx" ON "cms"."enquiries" USING btree ("county");
  CREATE INDEX "enquiries_event_details_event_details_preferred_date_idx" ON "cms"."enquiries" USING btree ("event_details_preferred_date");
  CREATE INDEX "enquiries_preferred_date_idx" ON "cms"."enquiries" USING btree ("preferred_date");
  CREATE INDEX "enquiries_request_hash_idx" ON "cms"."enquiries" USING btree ("request_hash");
  CREATE INDEX "enquiries_updated_at_idx" ON "cms"."enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "cms"."enquiries" USING btree ("created_at");
  CREATE INDEX "_enquiries_v_parent_idx" ON "cms"."_enquiries_v" USING btree ("parent_id");
  CREATE INDEX "_enquiries_v_version_version_status_idx" ON "cms"."_enquiries_v" USING btree ("version_status");
  CREATE INDEX "_enquiries_v_version_version_assigned_to_idx" ON "cms"."_enquiries_v" USING btree ("version_assigned_to_id");
  CREATE INDEX "_enquiries_v_version_contact_version_contact_contact_nam_idx" ON "cms"."_enquiries_v" USING btree ("version_contact_contact_name");
  CREATE INDEX "_enquiries_v_version_contact_version_contact_email_idx" ON "cms"."_enquiries_v" USING btree ("version_contact_email");
  CREATE INDEX "_enquiries_v_version_version_contact_name_idx" ON "cms"."_enquiries_v" USING btree ("version_contact_name");
  CREATE INDEX "_enquiries_v_version_school_details_version_school_detai_idx" ON "cms"."_enquiries_v" USING btree ("version_school_details_school");
  CREATE INDEX "_enquiries_v_version_school_details_version_school_det_1_idx" ON "cms"."_enquiries_v" USING btree ("version_school_details_county");
  CREATE INDEX "_enquiries_v_version_version_school_idx" ON "cms"."_enquiries_v" USING btree ("version_school");
  CREATE INDEX "_enquiries_v_version_version_county_idx" ON "cms"."_enquiries_v" USING btree ("version_county");
  CREATE INDEX "_enquiries_v_version_event_details_version_event_details_idx" ON "cms"."_enquiries_v" USING btree ("version_event_details_preferred_date");
  CREATE INDEX "_enquiries_v_version_version_preferred_date_idx" ON "cms"."_enquiries_v" USING btree ("version_preferred_date");
  CREATE INDEX "_enquiries_v_version_version_request_hash_idx" ON "cms"."_enquiries_v" USING btree ("version_request_hash");
  CREATE INDEX "_enquiries_v_version_version_updated_at_idx" ON "cms"."_enquiries_v" USING btree ("version_updated_at");
  CREATE INDEX "_enquiries_v_version_version_created_at_idx" ON "cms"."_enquiries_v" USING btree ("version_created_at");
  CREATE INDEX "_enquiries_v_created_at_idx" ON "cms"."_enquiries_v" USING btree ("created_at");
  CREATE INDEX "_enquiries_v_updated_at_idx" ON "cms"."_enquiries_v" USING btree ("updated_at");
  CREATE INDEX "pages_sections_items_order_idx" ON "cms"."pages_sections_items" USING btree ("_order");
  CREATE INDEX "pages_sections_items_parent_id_idx" ON "cms"."pages_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_sections_order_idx" ON "cms"."pages_sections" USING btree ("_order");
  CREATE INDEX "pages_sections_parent_id_idx" ON "cms"."pages_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "cms"."pages" USING btree ("slug");
  CREATE INDEX "pages_hero_hero_media_idx" ON "cms"."pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "cms"."pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "cms"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "cms"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "cms"."pages" USING btree ("_status");
  CREATE INDEX "_pages_v_version_sections_items_order_idx" ON "cms"."_pages_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_sections_items_parent_id_idx" ON "cms"."_pages_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_sections_order_idx" ON "cms"."_pages_v_version_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_version_sections_parent_id_idx" ON "cms"."_pages_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "cms"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "cms"."_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "cms"."_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "cms"."_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "cms"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "cms"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "cms"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "cms"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "cms"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "cms"."_pages_v" USING btree ("latest");
  CREATE INDEX "faqs__order_idx" ON "cms"."faqs" USING btree ("_order");
  CREATE INDEX "faqs_updated_at_idx" ON "cms"."faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "cms"."faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "cms"."faqs" USING btree ("_status");
  CREATE INDEX "_faqs_v_parent_idx" ON "cms"."_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version__order_idx" ON "cms"."_faqs_v" USING btree ("version__order");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "cms"."_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "cms"."_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "cms"."_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "cms"."_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "cms"."_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_latest_idx" ON "cms"."_faqs_v" USING btree ("latest");
  CREATE INDEX "galleries_items_order_idx" ON "cms"."galleries_items" USING btree ("_order");
  CREATE INDEX "galleries_items_parent_id_idx" ON "cms"."galleries_items" USING btree ("_parent_id");
  CREATE INDEX "galleries_items_media_idx" ON "cms"."galleries_items" USING btree ("media_id");
  CREATE UNIQUE INDEX "galleries_slug_idx" ON "cms"."galleries" USING btree ("slug");
  CREATE INDEX "galleries_updated_at_idx" ON "cms"."galleries" USING btree ("updated_at");
  CREATE INDEX "galleries_created_at_idx" ON "cms"."galleries" USING btree ("created_at");
  CREATE INDEX "galleries__status_idx" ON "cms"."galleries" USING btree ("_status");
  CREATE INDEX "_galleries_v_version_items_order_idx" ON "cms"."_galleries_v_version_items" USING btree ("_order");
  CREATE INDEX "_galleries_v_version_items_parent_id_idx" ON "cms"."_galleries_v_version_items" USING btree ("_parent_id");
  CREATE INDEX "_galleries_v_version_items_media_idx" ON "cms"."_galleries_v_version_items" USING btree ("media_id");
  CREATE INDEX "_galleries_v_parent_idx" ON "cms"."_galleries_v" USING btree ("parent_id");
  CREATE INDEX "_galleries_v_version_version_slug_idx" ON "cms"."_galleries_v" USING btree ("version_slug");
  CREATE INDEX "_galleries_v_version_version_updated_at_idx" ON "cms"."_galleries_v" USING btree ("version_updated_at");
  CREATE INDEX "_galleries_v_version_version_created_at_idx" ON "cms"."_galleries_v" USING btree ("version_created_at");
  CREATE INDEX "_galleries_v_version_version__status_idx" ON "cms"."_galleries_v" USING btree ("version__status");
  CREATE INDEX "_galleries_v_created_at_idx" ON "cms"."_galleries_v" USING btree ("created_at");
  CREATE INDEX "_galleries_v_updated_at_idx" ON "cms"."_galleries_v" USING btree ("updated_at");
  CREATE INDEX "_galleries_v_latest_idx" ON "cms"."_galleries_v" USING btree ("latest");
  CREATE INDEX "venues_features_order_idx" ON "cms"."venues_features" USING btree ("_order");
  CREATE INDEX "venues_features_parent_id_idx" ON "cms"."venues_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "venues_slug_idx" ON "cms"."venues" USING btree ("slug");
  CREATE INDEX "venues_county_idx" ON "cms"."venues" USING btree ("county");
  CREATE INDEX "venues_hero_media_idx" ON "cms"."venues" USING btree ("hero_media_id");
  CREATE INDEX "venues_gallery_idx" ON "cms"."venues" USING btree ("gallery_id");
  CREATE INDEX "venues_seo_seo_image_idx" ON "cms"."venues" USING btree ("seo_image_id");
  CREATE INDEX "venues_updated_at_idx" ON "cms"."venues" USING btree ("updated_at");
  CREATE INDEX "venues_created_at_idx" ON "cms"."venues" USING btree ("created_at");
  CREATE INDEX "venues__status_idx" ON "cms"."venues" USING btree ("_status");
  CREATE INDEX "_venues_v_version_features_order_idx" ON "cms"."_venues_v_version_features" USING btree ("_order");
  CREATE INDEX "_venues_v_version_features_parent_id_idx" ON "cms"."_venues_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_venues_v_parent_idx" ON "cms"."_venues_v" USING btree ("parent_id");
  CREATE INDEX "_venues_v_version_version_slug_idx" ON "cms"."_venues_v" USING btree ("version_slug");
  CREATE INDEX "_venues_v_version_version_county_idx" ON "cms"."_venues_v" USING btree ("version_county");
  CREATE INDEX "_venues_v_version_version_hero_media_idx" ON "cms"."_venues_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_venues_v_version_version_gallery_idx" ON "cms"."_venues_v" USING btree ("version_gallery_id");
  CREATE INDEX "_venues_v_version_seo_version_seo_image_idx" ON "cms"."_venues_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_venues_v_version_version_updated_at_idx" ON "cms"."_venues_v" USING btree ("version_updated_at");
  CREATE INDEX "_venues_v_version_version_created_at_idx" ON "cms"."_venues_v" USING btree ("version_created_at");
  CREATE INDEX "_venues_v_version_version__status_idx" ON "cms"."_venues_v" USING btree ("version__status");
  CREATE INDEX "_venues_v_created_at_idx" ON "cms"."_venues_v" USING btree ("created_at");
  CREATE INDEX "_venues_v_updated_at_idx" ON "cms"."_venues_v" USING btree ("updated_at");
  CREATE INDEX "_venues_v_latest_idx" ON "cms"."_venues_v" USING btree ("latest");
  CREATE UNIQUE INDEX "events_slug_idx" ON "cms"."events" USING btree ("slug");
  CREATE INDEX "events_event_date_idx" ON "cms"."events" USING btree ("event_date");
  CREATE INDEX "events_county_idx" ON "cms"."events" USING btree ("county");
  CREATE INDEX "events_venue_idx" ON "cms"."events" USING btree ("venue_id");
  CREATE INDEX "events_hero_media_idx" ON "cms"."events" USING btree ("hero_media_id");
  CREATE INDEX "events_gallery_idx" ON "cms"."events" USING btree ("gallery_id");
  CREATE INDEX "events_featured_idx" ON "cms"."events" USING btree ("featured");
  CREATE INDEX "events_seo_seo_image_idx" ON "cms"."events" USING btree ("seo_image_id");
  CREATE INDEX "events_updated_at_idx" ON "cms"."events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "cms"."events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "cms"."events" USING btree ("_status");
  CREATE INDEX "_events_v_parent_idx" ON "cms"."_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "cms"."_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_event_date_idx" ON "cms"."_events_v" USING btree ("version_event_date");
  CREATE INDEX "_events_v_version_version_county_idx" ON "cms"."_events_v" USING btree ("version_county");
  CREATE INDEX "_events_v_version_version_venue_idx" ON "cms"."_events_v" USING btree ("version_venue_id");
  CREATE INDEX "_events_v_version_version_hero_media_idx" ON "cms"."_events_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_events_v_version_version_gallery_idx" ON "cms"."_events_v" USING btree ("version_gallery_id");
  CREATE INDEX "_events_v_version_version_featured_idx" ON "cms"."_events_v" USING btree ("version_featured");
  CREATE INDEX "_events_v_version_seo_version_seo_image_idx" ON "cms"."_events_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "cms"."_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "cms"."_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "cms"."_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "cms"."_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "cms"."_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "cms"."_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "cms"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "cms"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "cms"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "cms"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "cms"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "cms"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "cms"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_galleries_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("galleries_id");
  CREATE INDEX "payload_locked_documents_rels_venues_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("venues_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_preferences_key_idx" ON "cms"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "cms"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "cms"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "cms"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "cms"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "cms"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "cms"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "cms"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "cms"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_social_image_idx" ON "cms"."site_settings" USING btree ("default_social_image_id");
  CREATE INDEX "home_page_highlights_order_idx" ON "cms"."home_page_highlights" USING btree ("_order");
  CREATE INDEX "home_page_highlights_parent_id_idx" ON "cms"."home_page_highlights" USING btree ("_parent_id");
  CREATE INDEX "home_page_steps_order_idx" ON "cms"."home_page_steps" USING btree ("_order");
  CREATE INDEX "home_page_steps_parent_id_idx" ON "cms"."home_page_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_parent_guidance_points_order_idx" ON "cms"."home_page_parent_guidance_points" USING btree ("_order");
  CREATE INDEX "home_page_parent_guidance_points_parent_id_idx" ON "cms"."home_page_parent_guidance_points" USING btree ("_parent_id");
  CREATE INDEX "home_page_proof_proof_gallery_idx" ON "cms"."home_page" USING btree ("proof_gallery_id");
  CREATE INDEX "home_page_seo_seo_image_idx" ON "cms"."home_page" USING btree ("seo_image_id");
  CREATE INDEX "home_page__status_idx" ON "cms"."home_page" USING btree ("_status");
  CREATE INDEX "_home_page_v_version_highlights_order_idx" ON "cms"."_home_page_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_highlights_parent_id_idx" ON "cms"."_home_page_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_steps_order_idx" ON "cms"."_home_page_v_version_steps" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_steps_parent_id_idx" ON "cms"."_home_page_v_version_steps" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_parent_guidance_points_order_idx" ON "cms"."_home_page_v_version_parent_guidance_points" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_parent_guidance_points_parent_id_idx" ON "cms"."_home_page_v_version_parent_guidance_points" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_proof_version_proof_gallery_idx" ON "cms"."_home_page_v" USING btree ("version_proof_gallery_id");
  CREATE INDEX "_home_page_v_version_seo_version_seo_image_idx" ON "cms"."_home_page_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "cms"."_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "cms"."_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "cms"."_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "cms"."_home_page_v" USING btree ("latest");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cms"."users_sessions" CASCADE;
  DROP TABLE "cms"."users" CASCADE;
  DROP TABLE "cms"."media" CASCADE;
  DROP TABLE "cms"."enquiries" CASCADE;
  DROP TABLE "cms"."_enquiries_v" CASCADE;
  DROP TABLE "cms"."pages_sections_items" CASCADE;
  DROP TABLE "cms"."pages_sections" CASCADE;
  DROP TABLE "cms"."pages" CASCADE;
  DROP TABLE "cms"."_pages_v_version_sections_items" CASCADE;
  DROP TABLE "cms"."_pages_v_version_sections" CASCADE;
  DROP TABLE "cms"."_pages_v" CASCADE;
  DROP TABLE "cms"."faqs" CASCADE;
  DROP TABLE "cms"."_faqs_v" CASCADE;
  DROP TABLE "cms"."galleries_items" CASCADE;
  DROP TABLE "cms"."galleries" CASCADE;
  DROP TABLE "cms"."_galleries_v_version_items" CASCADE;
  DROP TABLE "cms"."_galleries_v" CASCADE;
  DROP TABLE "cms"."venues_features" CASCADE;
  DROP TABLE "cms"."venues" CASCADE;
  DROP TABLE "cms"."_venues_v_version_features" CASCADE;
  DROP TABLE "cms"."_venues_v" CASCADE;
  DROP TABLE "cms"."events" CASCADE;
  DROP TABLE "cms"."_events_v" CASCADE;
  DROP TABLE "cms"."payload_kv" CASCADE;
  DROP TABLE "cms"."payload_locked_documents" CASCADE;
  DROP TABLE "cms"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "cms"."payload_preferences" CASCADE;
  DROP TABLE "cms"."payload_preferences_rels" CASCADE;
  DROP TABLE "cms"."payload_migrations" CASCADE;
  DROP TABLE "cms"."site_settings" CASCADE;
  DROP TABLE "cms"."home_page_highlights" CASCADE;
  DROP TABLE "cms"."home_page_steps" CASCADE;
  DROP TABLE "cms"."home_page_parent_guidance_points" CASCADE;
  DROP TABLE "cms"."home_page" CASCADE;
  DROP TABLE "cms"."_home_page_v_version_highlights" CASCADE;
  DROP TABLE "cms"."_home_page_v_version_steps" CASCADE;
  DROP TABLE "cms"."_home_page_v_version_parent_guidance_points" CASCADE;
  DROP TABLE "cms"."_home_page_v" CASCADE;
  DROP TYPE "cms"."enum_users_role";
  DROP TYPE "cms"."enum_media_orientation";
  DROP TYPE "cms"."enum_enquiries_status";
  DROP TYPE "cms"."enum_enquiries_event_details_event_type";
  DROP TYPE "cms"."enum_enquiries_event_details_attendance_band";
  DROP TYPE "cms"."enum_enquiries_notification_status";
  DROP TYPE "cms"."enum__enquiries_v_version_status";
  DROP TYPE "cms"."enum__enquiries_v_version_event_details_event_type";
  DROP TYPE "cms"."enum__enquiries_v_version_event_details_attendance_band";
  DROP TYPE "cms"."enum__enquiries_v_version_notification_status";
  DROP TYPE "cms"."enum_pages_slug";
  DROP TYPE "cms"."enum_pages_status";
  DROP TYPE "cms"."enum__pages_v_version_slug";
  DROP TYPE "cms"."enum__pages_v_version_status";
  DROP TYPE "cms"."enum_faqs_page";
  DROP TYPE "cms"."enum_faqs_status";
  DROP TYPE "cms"."enum__faqs_v_version_page";
  DROP TYPE "cms"."enum__faqs_v_version_status";
  DROP TYPE "cms"."enum_galleries_status";
  DROP TYPE "cms"."enum__galleries_v_version_status";
  DROP TYPE "cms"."enum_venues_status";
  DROP TYPE "cms"."enum__venues_v_version_status";
  DROP TYPE "cms"."enum_events_status";
  DROP TYPE "cms"."enum__events_v_version_status";
  DROP TYPE "cms"."enum_home_page_highlights_icon";
  DROP TYPE "cms"."enum_home_page_status";
  DROP TYPE "cms"."enum__home_page_v_version_highlights_icon";
  DROP TYPE "cms"."enum__home_page_v_version_status";
  DROP SCHEMA IF EXISTS "cms";`)
}
