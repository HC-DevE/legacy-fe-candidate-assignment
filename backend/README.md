## Tech Stack

- Node.js 20+, TypeScript
- Express (HTTP API)
- viem (recover signer from signature)
- Zod (request validation)
- Jest (tests)

## Requirements

- Node.js 20+
- pnpm (recommended) or npm

Running frontend (for local demo) on http://localhost:3000

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd /backend
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


## API
### POST /verify-signature

Verifies a signed message (EIP-191) and returns signer address.

Request

```json
{ "message": "dm-test-191", "signature": "0x..." }
```

200 Response

```json
{ "isValid": true, "signer": "0xabc123...", "originalMessage": "dm-test-191" }
```


Errors

- 400 invalid payload (fails Zod schema)

- 422 signature unrecoverable or mismatched


Example

curl -X POST http://localhost:3001/verify-signature \
  -H "Content-Type: application/json" \
  -d '{"message":"dm-test-191","signature":"0x..."}'


### Tests

Jest config included.

pnpm test