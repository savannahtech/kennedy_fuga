# Build Stage
FROM node:18-slim
WORKDIR /src

# https://mediasoup.org/documentation/v3/mediasoup/installation/
ENV MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD="true"

# Install build dependencies and Python 3
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Cleanup unnecessary dependencies and packages

COPY app app
COPY public public

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh

# Make file executable
RUN chmod +x /entrypoint.sh


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["/entrypoint.sh"]
