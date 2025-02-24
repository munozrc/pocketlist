CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`walletId` integer NOT NULL,
	`icon` text,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'completed',
	`paymentMethod` text NOT NULL,
	`currency` text DEFAULT 'COP',
	`category` text NOT NULL,
	`description` text,
	`isRecurring` integer DEFAULT false,
	`receiptUrl` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`walletId`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real NOT NULL,
	`type` text NOT NULL,
	`currency` text DEFAULT 'COP',
	`icon` text,
	`totalExpenses` real DEFAULT 0,
	`totalIncome` real DEFAULT 0,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL
);
