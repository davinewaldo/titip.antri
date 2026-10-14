import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { QueQBooking, UserProfile } from './types';
import { TOP_MERCHANTS } from './data/merchants';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with Database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Error handling helper conforming to FirestoreErrorInfo
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Google Sign In
export async function loginWithGoogle(): Promise<UserProfile> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Sync profile to Firestore
    const profile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName || 'Pengguna QueQ',
      email: user.email,
      photoURL: user.photoURL
    };

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: profile.uid,
        displayName: profile.displayName,
        email: profile.email,
        photoURL: profile.photoURL,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Profile sync warning:', e);
    }

    return profile;
  } catch (err) {
    console.error('Google Sign-in failed:', err);
    throw err;
  }
}

// Logout
export async function logoutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

// Auth State Observer
export function onAuthUserChange(callback: (user: UserProfile | null) => void) {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      callback({
        uid: user.uid,
        displayName: user.displayName || 'Pengguna QueQ',
        email: user.email,
        photoURL: user.photoURL
      });
    } else {
      callback(null);
    }
  });
}

// Test Connection on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'merchants', 'm-sby-1'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
    return false;
  }
}

// Seed initial merchants if not yet populated
export async function initializeMerchantsInFirestore() {
  try {
    for (const m of TOP_MERCHANTS) {
      const merchantRef = doc(db, 'merchants', m.id);
      await setDoc(merchantRef, {
        id: m.id,
        name: m.name,
        city: m.city,
        location: m.location,
        category: m.category,
        categoryTag: m.categoryTag,
        currentCallingNumber: m.currentCallingNumber,
        totalQueuesWaiting: m.totalQueuesWaiting,
        isOpen: m.isOpen,
        distanceKm: m.distanceKm
      }, { merge: true });
    }
  } catch (err) {
    console.error('Failed to seed merchants:', err);
  }
}

// Save Queue Ticket to Firestore
export async function saveQueueTicketToFirestore(booking: QueQBooking) {
  const path = `queues/${booking.ticketId}`;
  try {
    const queueRef = doc(db, 'queues', booking.ticketId);
    await setDoc(queueRef, {
      ticketId: booking.ticketId,
      merchantId: booking.merchantId,
      merchantName: booking.merchantName,
      merchantLocation: booking.merchantLocation,
      merchantCity: booking.merchantCity,
      partySize: booking.partySize,
      ticketNumber: booking.ticketNumber,
      currentCalling: booking.currentCalling,
      queuesAhead: booking.queuesAhead,
      estimatedWaitMinutes: booking.estimatedWaitMinutes,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      status: booking.status,
      timestamp: booking.timestamp,
      createdAtMs: booking.createdAtMs || Date.now(),
      calledAtMs: booking.calledAtMs || null,
      verificationDeadlineMs: booking.verificationDeadlineMs || null,
      isCashierVerified: booking.isCashierVerified ?? false,
      verifiedAt: booking.verifiedAt || null,
      cancellationReason: booking.cancellationReason || null,
      userId: booking.userId || null,
      userEmail: booking.userEmail || null
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Update Queue Ticket in Firestore
export async function updateQueueTicketInFirestore(ticketId: string, updates: Partial<QueQBooking>) {
  const path = `queues/${ticketId}`;
  try {
    const queueRef = doc(db, 'queues', ticketId);
    await updateDoc(queueRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Cancel / Delete Ticket in Firestore
export async function cancelQueueTicketInFirestore(ticketId: string) {
  const path = `queues/${ticketId}`;
  try {
    const queueRef = doc(db, 'queues', ticketId);
    await deleteDoc(queueRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Retrieve active ticket for a user from Firestore
export async function fetchUserLatestTicketFromFirestore(userId: string): Promise<QueQBooking | null> {
  try {
    const q = query(
      collection(db, 'queues'),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    
    // Find active ticket (status waiting, almost_ready, called)
    const tickets = snap.docs.map(d => d.data() as QueQBooking);
    const active = tickets.find(t => ['waiting', 'almost_ready', 'called'].includes(t.status));
    return active || null;
  } catch (err) {
    console.warn('Could not fetch user ticket:', err);
    return null;
  }
}
