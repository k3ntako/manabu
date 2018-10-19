require 'spec_helper'
RSpec.describe Mastery, type: :model do
  describe "Mastery model" do
    it { should have_valid(:mastery).when("Learning") }
    it { should_not have_valid(:mastery).when(nil, "") }
  end
end
