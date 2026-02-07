# LPK Dua Berkah - Firebase Configuration Guide

## Problem Solved

Previously, the application was experiencing the error:
```
Firebase App named '[DEFAULT]' already exists
```

This was caused by multiple service files independently initializing Firebase, leading to conflicts.

## Solution Implemented

### 1. Centralized Firebase Configuration
- Created a single Firebase initialization in `lib/firebase.ts`
- All services now import Firebase components from this centralized file
- Implemented proper initialization check to prevent duplicate apps

### 2. Service Files Updated
All service files were updated to use the centralized Firebase configuration:
- `services/authService.ts`
- `services/pesertaService.ts`
- `services/kontrakService.ts`
- `services/pendaftarService.ts`
- `services/programService.ts`

### 3. Key Features of the Solution

#### Firebase Initialization Logic
```typescript
import { initializeApp, getApp, getApps } from 'firebase/app';
// ...
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
```

#### Type Safety Improvements
- Added proper type casting with `as const` for status values
- Improved return types for all service methods
- Better null checking for Firebase-generated IDs

#### Debug Logging
Added comprehensive debug logging to track Firebase initialization:
```typescript
console.log('[DEBUG] lib/firebase - Checking existing Firebase apps:', getApps().length);
console.log('[DEBUG] lib/firebase - Firebase app initialized:', app.name);
```

## Architecture

```
lib/firebase.ts (Centralized Firebase initialization)
    ↓
services/ (All services import from lib/firebase.ts)
    ↓
hooks/ (Custom hooks use services)
    ↓
app/admin/ (Pages use hooks)
```

## Verification

To verify the Firebase configuration is working correctly:

1. Visit `/test-firebase` page in the application
2. Check browser console for the following messages:
   ```
   [DEBUG] lib/firebase - Checking existing Firebase apps: 0
   [DEBUG] lib/firebase - Firebase app initialized: [DEFAULT]
   [DEBUG] authService - Using centralized Firebase instance
   [DEBUG] pesertaService - Using centralized Firebase instance
   [DEBUG] kontrakService - Using centralized Firebase instance
   [DEBUG] pendaftarService - Using centralized Firebase instance
   [DEBUG] programService - Using centralized Firebase instance
   ```

## Best Practices Implemented

1. **Single Source of Truth** - Firebase configuration centralized in `lib/firebase.ts`
2. **Type Safety** - Proper TypeScript typing throughout
3. **Error Handling** - Comprehensive error logging and handling
4. **Null Safety** - Validation checks for critical operations
5. **Debug Logging** - Easy troubleshooting with prefixed debug messages

## Files Modified

- `lib/firebase.ts` - Centralized Firebase initialization
- `services/authService.ts` - Refactored to use centralized Firebase
- `services/pesertaService.ts` - Refactored to use centralized Firebase + type fixes
- `services/kontrakService.ts` - Refactored to use centralized Firebase
- `services/pendaftarService.ts` - Refactored to use centralized Firebase + type fixes
- `services/programService.ts` - Refactored to use centralized Firebase
- `lib/auth.ts` - Updated to import from ./firebase
- `hooks/usePeserta.ts` - Updated to use services
- `hooks/useProgram.ts` - Updated to use services
- `hooks/usePendaftar.ts` - Updated to use services