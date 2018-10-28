class CardSerializer < ActiveModel::Serializer
  attributes :id, :term, :term_title

  has_many :definitions
  has_many :masteries

  def term_title
    object.definition_title.title
  end
end
