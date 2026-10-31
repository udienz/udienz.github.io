# frozen_string_literal: true

# Ruby 3.2 removed Object#taint/#untaint/#tainted? (deprecated no-ops
# since Ruby 2.7, fully removed in 3.2). This site's Gemfile.lock still
# resolves to liquid 4.0.3, which Jekyll's own gemspec pins to
# ("liquid ~> 4.0") even on the latest Jekyll release, so bumping Jekyll
# alone cannot move past it. liquid 4.0.3's Variable#taint_check calls
# `obj.tainted?`, which raises NoMethodError on Ruby >= 3.2 and breaks
# every build.
#
# Restore the old no-op behavior: on modern Ruby nothing ever marks an
# object as tainted, so `tainted?` being unconditionally false is exactly
# how real objects already behaved before the API was removed.
unless Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end

    def taint
      self
    end

    def untaint
      self
    end
  end
end
