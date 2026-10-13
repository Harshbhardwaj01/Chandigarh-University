FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=build /app/dist ./dist
COPY --from=build /app/data ./data
COPY --from=build /app/amplify ./amplify
COPY --from=build /app/chandigarh_university_backend.js ./chandigarh_university_backend.js
COPY --from=build /app/amplify_outputs.json ./amplify_outputs.json

ENV PORT=5001
EXPOSE 5001

CMD ["node", "chandigarh_university_backend.js"]
