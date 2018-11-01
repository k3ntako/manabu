class DefinitionSerializer < ActiveModel::Serializer
  attributes :id, :definition, :definition_title, :sequence

  def definition_title
    object.definition_title.title
  end
end
