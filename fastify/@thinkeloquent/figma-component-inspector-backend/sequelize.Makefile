# Sequelize Makefile for Figma Component Inspector Backend
# Usage: make -f sequelize.Makefile [command]

# Environment setup
export POSTGRES_USER ?= $(shell echo $$POSTGRES_USER)
export POSTGRES_PASSWORD ?= $(shell echo $$POSTGRES_PASSWORD)
export POSTGRES_DB ?= $(shell echo $$POSTGRES_DB)
export POSTGRES_HOST ?= $(shell echo $$POSTGRES_HOST)
export POSTGRES_PORT ?= $(shell echo $$POSTGRES_PORT)
export POSTGRES_SCHEMA ?= $(shell echo $$POSTGRES_SCHEMA)

# Paths
SEQUELIZE_CLI = npx sequelize-cli
BACKEND_DIR = .
MIGRATION_DIR = $(BACKEND_DIR)/sequelize-migration
SEED_DIR = $(BACKEND_DIR)/sequelize-seed

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[1;33m
NC = \033[0m # No Color

.PHONY: help
help:
	@echo "$(GREEN)Sequelize Commands for Figma Component Inspector$(NC)"
	@echo ""
	@echo "$(YELLOW)Migration Commands:$(NC)"
	@echo "  make migrate           - Run pending migrations"
	@echo "  make migrate-undo      - Undo last migration"
	@echo "  make migrate-undo-all  - Undo all migrations"
	@echo "  make migrate-status    - Show migration status"
	@echo "  make migrate-create    - Create new migration (NAME=migration-name)"
	@echo ""
	@echo "$(YELLOW)Seed Commands:$(NC)"
	@echo "  make seed              - Run all seeders"
	@echo "  make seed-undo         - Undo last seed"
	@echo "  make seed-undo-all     - Undo all seeds"
	@echo "  make seed-create       - Create new seed (NAME=seed-name)"
	@echo ""
	@echo "$(YELLOW)Database Commands:$(NC)"
	@echo "  make db-create         - Create database"
	@echo "  make db-drop           - Drop database (WARNING: Destructive)"
	@echo "  make db-reset          - Drop, create, and migrate database"
	@echo "  make db-setup          - Create and migrate database"
	@echo ""
	@echo "$(YELLOW)Build Commands:$(NC)"
	@echo "  make build             - Build TypeScript files"
	@echo "  make build-watch       - Watch and rebuild TypeScript files"
	@echo ""
	@echo "$(YELLOW)Utility Commands:$(NC)"
	@echo "  make validate          - Validate Sequelize models"
	@echo "  make sync              - Sync database schema (dev only)"
	@echo "  make sync-force        - Force sync database schema (WARNING: Drops tables)"
	@echo ""

# Migration Commands
.PHONY: migrate
migrate:
	@echo "$(GREEN)Running migrations...$(NC)"
	@$(SEQUELIZE_CLI) db:migrate

.PHONY: migrate-undo
migrate-undo:
	@echo "$(YELLOW)Undoing last migration...$(NC)"
	@$(SEQUELIZE_CLI) db:migrate:undo

.PHONY: migrate-undo-all
migrate-undo-all:
	@echo "$(YELLOW)Undoing all migrations...$(NC)"
	@$(SEQUELIZE_CLI) db:migrate:undo:all

.PHONY: migrate-status
migrate-status:
	@echo "$(GREEN)Migration status:$(NC)"
	@$(SEQUELIZE_CLI) db:migrate:status

.PHONY: migrate-create
migrate-create:
	@if [ -z "$(NAME)" ]; then \
		echo "$(YELLOW)Please provide migration name: make migrate-create NAME=your-migration-name$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Creating migration: $(NAME)$(NC)"
	@$(SEQUELIZE_CLI) migration:generate --name $(NAME)
	@echo "$(YELLOW)Converting to .cjs extension...$(NC)"
	@cd $(MIGRATION_DIR)/migrations && \
		for file in *.js; do \
			if [ -f "$$file" ]; then \
				mv "$$file" "$${file%.js}.cjs"; \
			fi; \
		done
	@echo "$(GREEN)Migration created successfully$(NC)"

# Aliases for colons (for compatibility)
.PHONY: migrate\:undo
migrate\:undo: migrate-undo

.PHONY: migrate\:undo\:all
migrate\:undo\:all: migrate-undo-all

.PHONY: migrate\:status
migrate\:status: migrate-status

.PHONY: migrate\:create
migrate\:create: migrate-create

# Seed Commands
.PHONY: seed
seed:
	@echo "$(GREEN)Running seeders...$(NC)"
	@$(SEQUELIZE_CLI) db:seed:all

.PHONY: seed-undo
seed-undo:
	@echo "$(YELLOW)Undoing last seed...$(NC)"
	@$(SEQUELIZE_CLI) db:seed:undo

.PHONY: seed-undo-all
seed-undo-all:
	@echo "$(YELLOW)Undoing all seeds...$(NC)"
	@$(SEQUELIZE_CLI) db:seed:undo:all

.PHONY: seed-create
seed-create:
	@if [ -z "$(NAME)" ]; then \
		echo "$(YELLOW)Please provide seed name: make seed-create NAME=your-seed-name$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Creating seed: $(NAME)$(NC)"
	@$(SEQUELIZE_CLI) seed:generate --name $(NAME)
	@echo "$(YELLOW)Converting to .cjs extension...$(NC)"
	@cd $(SEED_DIR)/seeds && \
		for file in *.js; do \
			if [ -f "$$file" ]; then \
				mv "$$file" "$${file%.js}.cjs"; \
			fi; \
		done
	@echo "$(GREEN)Seed created successfully$(NC)"

# Aliases for colons (for compatibility)
.PHONY: seed\:undo
seed\:undo: seed-undo

.PHONY: seed\:undo\:all
seed\:undo\:all: seed-undo-all

.PHONY: seed\:create
seed\:create: seed-create

# Database Commands
.PHONY: db-create
db-create:
	@echo "$(GREEN)Creating database...$(NC)"
	@$(SEQUELIZE_CLI) db:create

.PHONY: db-drop
db-drop:
	@echo "$(YELLOW)WARNING: This will drop the database!$(NC)"
	@read -p "Are you sure? (y/N) " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		$(SEQUELIZE_CLI) db:drop; \
	else \
		echo "Aborted."; \
	fi

.PHONY: db-reset
db-reset: db-drop db-create migrate seed
	@echo "$(GREEN)Database reset complete$(NC)"

.PHONY: db-setup
db-setup: db-create migrate
	@echo "$(GREEN)Database setup complete$(NC)"

# Aliases for colons (for compatibility)
.PHONY: db\:create
db\:create: db-create

.PHONY: db\:drop
db\:drop: db-drop

.PHONY: db\:reset
db\:reset: db-reset

.PHONY: db\:setup
db\:setup: db-setup

# Build Commands
.PHONY: build
build:
	@echo "$(GREEN)Building TypeScript...$(NC)"
	@npm run build

.PHONY: build-watch
build-watch:
	@echo "$(GREEN)Watching TypeScript files...$(NC)"
	@npm run build:watch

.PHONY: build\:watch
build\:watch: build-watch

# Validation and Sync Commands
.PHONY: validate
validate:
	@echo "$(GREEN)Validating Sequelize models...$(NC)"
	@node -e "import('./dist/sequelize/index.js').then(({createFigmaInspectorSequelize}) => { \
		return createFigmaInspectorSequelize({databaseUrl: process.env.DATABASE_URL || \
		'postgresql://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@' + \
		process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DB + \
		'?schema=' + (process.env.POSTGRES_SCHEMA || 'public')}).then(() => { \
		console.log('✓ Models validated successfully'); process.exit(0); \
		}).catch(err => { console.error('✗ Validation failed:', err); process.exit(1); }); \
		}).catch(err => { console.error('✗ Import failed:', err); process.exit(1); });"

.PHONY: sync
sync:
	@echo "$(YELLOW)Syncing database schema (development only)...$(NC)"
	@node -e "import('./dist/sequelize/index.js').then(({createFigmaInspectorSequelize}) => { \
		return createFigmaInspectorSequelize({databaseUrl: process.env.DATABASE_URL || \
		'postgresql://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@' + \
		process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DB + \
		'?schema=' + (process.env.POSTGRES_SCHEMA || 'public')}).then(async ({sequelize}) => { \
		await sequelize.sync({alter: true}); \
		console.log('✓ Database synced successfully'); process.exit(0); \
		}).catch(err => { console.error('✗ Sync failed:', err); process.exit(1); }); \
		}).catch(err => { console.error('✗ Import failed:', err); process.exit(1); });"

.PHONY: sync-force
sync-force:
	@echo "$(YELLOW)WARNING: This will drop and recreate all tables!$(NC)"
	@read -p "Are you sure? (y/N) " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		node -e "import('./dist/sequelize/index.js').then(({createFigmaInspectorSequelize}) => { \
		return createFigmaInspectorSequelize({databaseUrl: process.env.DATABASE_URL || \
		'postgresql://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@' + \
		process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DB + \
		'?schema=' + (process.env.POSTGRES_SCHEMA || 'public')}).then(async ({sequelize}) => { \
		await sequelize.sync({force: true}); \
		console.log('✓ Database force synced successfully'); process.exit(0); \
		}).catch(err => { console.error('✗ Force sync failed:', err); process.exit(1); }); \
		}).catch(err => { console.error('✗ Import failed:', err); process.exit(1); });"; \
	else \
		echo "Aborted."; \
	fi

.PHONY: sync\:force
sync\:force: sync-force

# Default command
.DEFAULT_GOAL := help