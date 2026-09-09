/* Supabase client for WilkyJamsDev Portfolio. Publishable key only. */
(function () {
    const SUPABASE_URL = 'https://ymmawibvlngvektawvcu.supabase.co';
    const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_mqcufPzGI06YM7zWc4KK6w_zdbr8oXy';
    if (!window.supabase || !window.supabase.createClient) {
        console.error('Supabase SDK no está disponible.');
        return;
    }
    window.portfolioSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
})();
