require 'spec_helper'
RSpec.describe DefinitionTitle, type: :model do
  describe "DefinitionTitle model" do
    it { should have_valid(:title).when("Numbers") }
    it { should_not have_valid(:title).when(nil, "") }
  end
end
