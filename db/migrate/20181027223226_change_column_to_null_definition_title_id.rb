class ChangeColumnToNullDefinitionTitleId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :cards, :definition_title_id, false, 1
    change_column_null :definitions, :definition_title_id, false, 1
  end
end
