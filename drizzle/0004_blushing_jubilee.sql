CREATE TABLE IF NOT EXISTS "code_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender-id" integer NOT NULL,
	"reciever_id" integer,
	"sent_on" timestamp DEFAULT now() NOT NULL,
	"recieved_on" timestamp,
	"was_viewed" boolean DEFAULT false NOT NULL,
	"message" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code_messages" ADD CONSTRAINT "code_messages_sender-id_users_id_fk" FOREIGN KEY ("sender-id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code_messages" ADD CONSTRAINT "code_messages_reciever_id_users_id_fk" FOREIGN KEY ("reciever_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
