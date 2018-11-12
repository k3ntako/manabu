require 'spec_helper'
RSpec.describe User, type: :model do
  describe "User model" do
    it { should have_valid(:email).when("k3ntako@k3ntako.com") }
    it { should_not have_valid(:email).when(nil, "") }

    it { should have_valid(:encrypted_password).when("Learning") }
    it { should_not have_valid(:encrypted_password).when(nil, "") }

    it { should have_valid(:first_name).when("Grace") }
    it { should_not have_valid(:first_name).when(nil, "") }

    it { should have_valid(:last_name).when("Hopper") }
    it { should_not have_valid(:last_name).when(nil, "") }

    it { should have_valid(:birthday).when(Date.new(1995,5,27)) }
    it { should_not have_valid(:birthday).when(nil, "") }

    it { should have_valid(:sign_in_count).when(19) }
    it { should_not have_valid(:sign_in_count).when(nil, "") }
  end
end
