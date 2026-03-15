FROM oven/bun:1.3.3

WORKDIR /app

COPY . .

RUN --mount=type=cache,target=/root/.cache/bun \
  bun install --frozen-lockfile

RUN --mount=type=secret,id=env \
  bun --env-file=.env run build

EXPOSE 3000

CMD ["bun", "run", "start"]
