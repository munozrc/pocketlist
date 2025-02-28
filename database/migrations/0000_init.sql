CREATE TABLE `transaction_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`wallet_id` integer NOT NULL,
	`icon` text,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'completed',
	`currency` text DEFAULT 'COP',
	`category` integer NOT NULL,
	`description` text,
	`is_recurring` integer DEFAULT false,
	`receipt_url` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category`) REFERENCES `transaction_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`type` text NOT NULL,
	`currency` text DEFAULT 'COP',
	`total_expenses` real DEFAULT 0 NOT NULL,
	`total_income` real DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
