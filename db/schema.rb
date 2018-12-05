# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_27_185359) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "term", null: false
    t.integer "sequence", null: false
    t.bigint "deck_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_cards_on_deck_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "definition_title_id", null: false
    t.index ["definition_title_id"], name: "index_decks_on_definition_title_id"
  end

  create_table "definition_titles", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "definitions", force: :cascade do |t|
    t.text "definition", default: "No Definition", null: false
    t.integer "sequence", null: false
    t.bigint "card_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "definition_title_id", null: false
    t.index ["card_id"], name: "index_definitions_on_card_id"
    t.index ["definition_title_id"], name: "index_definitions_on_definition_title_id"
  end

  create_table "masteries", force: :cascade do |t|
    t.string "mastery", null: false
    t.bigint "user_id", null: false
    t.bigint "card_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_masteries_on_card_id"
    t.index ["user_id"], name: "index_masteries_on_user_id"
  end

  create_table "notes", force: :cascade do |t|
    t.string "name", null: false
    t.text "note", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reminder_categories", force: :cascade do |t|
    t.string "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reminders", force: :cascade do |t|
    t.string "reminder", null: false
    t.datetime "time_due"
    t.integer "sequence", null: false
    t.bigint "reminder_category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "completed", default: false, null: false
    t.index ["reminder_category_id"], name: "index_reminders_on_reminder_category_id"
  end

  create_table "user_decks", force: :cascade do |t|
    t.bigint "deck_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_user_decks_on_deck_id"
    t.index ["user_id"], name: "index_user_decks_on_user_id"
  end

  create_table "user_notes", force: :cascade do |t|
    t.boolean "owner", default: false, null: false
    t.bigint "user_id", null: false
    t.bigint "note_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["note_id"], name: "index_user_notes_on_note_id"
    t.index ["user_id"], name: "index_user_notes_on_user_id"
  end

  create_table "user_reminders", force: :cascade do |t|
    t.integer "sequence", null: false
    t.bigint "reminder_category_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reminder_category_id"], name: "index_user_reminders_on_reminder_category_id"
    t.index ["user_id"], name: "index_user_reminders_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name", null: false
    t.string "middle_name"
    t.string "last_name", null: false
    t.date "birthday", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "profile_photo"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "decks", "definition_titles"
  add_foreign_key "definitions", "definition_titles"
end
