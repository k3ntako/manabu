class ReminderSerializer < ActiveModel::Serializer
  attributes :id, :reminder, :time_due, :sequence
end
