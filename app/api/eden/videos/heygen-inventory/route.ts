export const runtime = 'nodejs';

type HeyGenVideo = {
  id: string;
  title: string;
  status: string;
  duration?: number | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  pageUrl?: string | null;
};

type HeyGenAvatar = {
  id: string;
  name: string;
  avatarType: string;
  groupId?: string | null;
  previewImageUrl?: string | null;
  defaultVoiceId?: string | null;
  status?: string | null;
};

type HeyGenStyle = {
  id: string;
  name: string;
  aspectRatio?: string | null;
  previewVideoUrl?: string | null;
  thumbnailUrl?: string | null;
};

const verifiedSnapshot = {
  videos: [
    { id: '536318b8e85349929da1a7110bb20760', title: 'ES-20260608-TIKTOK-003 Mystery Avatar Clip', status: 'completed', duration: 12.6694, pageUrl: 'https://app.heygen.com/videos/536318b8e85349929da1a7110bb20760' },
    { id: '5dabb1a7979b435292084fe96f53dd8e', title: 'REPAIR ES-20260608-TIKTOK-012 Travel Avatar Clip', status: 'completed', duration: 10.2661, pageUrl: 'https://app.heygen.com/videos/5dabb1a7979b435292084fe96f53dd8e' },
    { id: '9580d737b9d6447a8d49abaee82472f9', title: 'REPAIR ES-20260608-TIKTOK-009 Fashion Avatar Clip', status: 'completed', duration: 11.938, pageUrl: 'https://app.heygen.com/videos/9580d737b9d6447a8d49abaee82472f9' }
  ] satisfies HeyGenVideo[],
  avatars: [
    { id: 'e2b5bc437bc7433d8c6c327c16dbee16', name: 'The Clear Resin Crafter', avatarType: 'photo_avatar', groupId: '401be319df204d89a8b68c4608bd6245', defaultVoiceId: 'd5518ba8884a4cf4aa0ee9803f5f082e', status: 'completed' },
    { id: 'b8abc7417c734bd1972af9efe90d964c', name: 'The Clear Resin Crafter', avatarType: 'photo_avatar', groupId: '401be319df204d89a8b68c4608bd6245', defaultVoiceId: 'd5518ba8884a4cf4aa0ee9803f5f082e', status: 'completed' }
  ] satisfies HeyGenAvatar[],
  styles: [
    { id: 'f9b6c9115a6f4be99abec4ae0b09657b', name: 'Planet Earth', aspectRatio: '9:16' },
    { id: '0d03454b528141999c6a47e120d7cdd7', name: 'Film Noir', aspectRatio: '9:16' },
    { id: 'cb896c823a334e2c8784f8c154007aa8', name: 'Contact Sheet', aspectRatio: '9:16' }
  ] satisfies HeyGenStyle[]
};

async function fetchHeyGen<T>(path: string): Promise<T | null> {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(`https://api.heygen.com${path}`, {
    headers: { 'x-api-key': apiKey },
    cache: 'no-store'
  });

  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

export async function GET() {
  const [videosResponse, avatarsResponse] = await Promise.all([
    fetchHeyGen<{ data?: { items?: Array<Record<string, unknown>> } }>('/v3/videos?limit=12'),
    fetchHeyGen<{ data?: { items?: Array<Record<string, unknown>> } }>('/v3/avatars/looks?limit=12&ownership=private')
  ]);

  const liveVideos = videosResponse?.data?.items?.map((item): HeyGenVideo => ({
    id: String(item.id || ''),
    title: String(item.title || 'Untitled HeyGen video'),
    status: String(item.status || 'unknown'),
    duration: typeof item.duration === 'number' ? item.duration : null,
    videoUrl: typeof item.video_url === 'string' ? item.video_url : null,
    thumbnailUrl: typeof item.thumbnail_url === 'string' ? item.thumbnail_url : null,
    pageUrl: typeof item.video_page_url === 'string' ? item.video_page_url : null
  })).filter((video) => video.id) || null;

  const liveAvatars = avatarsResponse?.data?.items?.map((item): HeyGenAvatar => ({
    id: String(item.id || ''),
    name: String(item.name || 'HeyGen avatar'),
    avatarType: String(item.avatar_type || 'unknown'),
    groupId: typeof item.group_id === 'string' ? item.group_id : null,
    previewImageUrl: typeof item.preview_image_url === 'string' ? item.preview_image_url : null,
    defaultVoiceId: typeof item.default_voice_id === 'string' ? item.default_voice_id : null,
    status: typeof item.status === 'string' ? item.status : null
  })).filter((avatar) => avatar.id) || null;

  return Response.json({
    ok: true,
    route: '/api/eden/videos/heygen-inventory',
    source: process.env.HEYGEN_API_KEY ? 'heygen_api_or_verified_snapshot' : 'verified_connector_snapshot',
    heygenApiConfigured: Boolean(process.env.HEYGEN_API_KEY),
    liveCreateBlocked: true,
    approvalRequiredForGeneration: true,
    videos: liveVideos?.length ? liveVideos : verifiedSnapshot.videos,
    avatars: liveAvatars?.length ? liveAvatars : verifiedSnapshot.avatars,
    styles: verifiedSnapshot.styles,
    notes: [
      'Inventory is safe to display in the admin.',
      'Create-video mutation remains blocked until explicit approval and backend credentials are verified.',
      'Official HeyGen API supports GET /v3/videos and GET /v3/avatars/looks with x-api-key authentication.'
    ]
  });
}
