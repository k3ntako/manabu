class DefinitionTitleSerializer < ActiveModel::Serializer
  attributes :id, :title, :sequence

  def sequence
    object.definitions.first.sequence
  end
end
