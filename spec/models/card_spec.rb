require 'spec_helper'
RSpec.describe Card, type: :model do
  describe "Card model" do
    it { should have_valid(:term).when("One") }
    it { should_not have_valid(:term).when(nil, "") }
  end
end
