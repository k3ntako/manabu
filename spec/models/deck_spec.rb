require 'spec_helper'
RSpec.describe Deck, type: :model do
  describe "Deck model" do
    it { should have_valid(:name).when("Numbers") }
    it { should_not have_valid(:name).when(nil, "") }
  end
end
