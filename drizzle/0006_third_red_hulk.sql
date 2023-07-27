ALTER TABLE "code_messages" DROP CONSTRAINT "code_messages_sender-id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "code_messages" DROP CONSTRAINT "code_messages_reciever_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "code_messages" RENAME COLUMN "reciever_id" TO "receiver_id";--> statement-breakpoint
ALTER TABLE "code_messages" RENAME COLUMN "recieved_on" TO "received_on";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code_messages" ADD CONSTRAINT "code_messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code_messages" ADD CONSTRAINT "code_messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
