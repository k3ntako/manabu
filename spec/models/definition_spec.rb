require 'spec_helper'
RSpec.describe Definition, type: :model do
  describe "Definition model" do
    it { should have_valid(:definition).when("Uno") }
    it { should_not have_valid(:definition).when(nil, "") }

    it { should have_valid(:sequence).when(1) }
    it { should_not have_valid(:sequence).when("One") }
    it { should_not have_valid(:sequence).when(nil, "") }

    card = FactoryBot.create(:card)
    it { should have_valid(:card).when(card) }
    it { should_not have_valid(:card).when(nil, nil) }

    def_title = FactoryBot.create(:definition_title)
    it { should have_valid(:definition_title).when(def_title) }
    it { should_not have_valid(:definition_title).when(nil, nil) }
  end
end
