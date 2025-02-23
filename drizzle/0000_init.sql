CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`walletId` integer NOT NULL,
	`icon` text NOT NULL,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`status` text NOT NULL,
	`paymentMethod` text NOT NULL,
	`currency` text DEFAULT 'COP',
	`exchangeRate` integer,
	`category` text NOT NULL,
	`description` text,
	`isRecurring` integer DEFAULT false,
	`receiptUrl` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`walletId`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real NOT NULL,
	`type` text NOT NULL,
	`currency` text DEFAULT 'COP',
	`icon` text NOT NULL,
	`totalExpenses` real NOT NULL,
	`totalIncome` real NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP
);
