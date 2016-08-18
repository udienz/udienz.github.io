FROM ruby:2.3

MAINTAINER Mahyuddin Susanto <udienz@gmail.com>
ADD . /code/
#RUN apt-get update \
#    && apt-get install git -y \
#    && apt-get clean
#RUN git clone https://github.com/udienz/udienz.github.io.git /code
WORKDIR /code
RUN bundle install
ENV LANGUAGE="en_US" \
    LANG="en_US.UTF-8" \
    LC_ALL="en_US" \
    LC_CTYPE="UTF-8"
VOLUME /code
#RUN jekyll build --verbose
CMD ["jekyll"]
