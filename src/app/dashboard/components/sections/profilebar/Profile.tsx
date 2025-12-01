"use client";

interface ProfileSectionProps {
  userName: string;
  userEmail: string;
  isAdmin: boolean;
}

export default function ProfileSection({ userName, userEmail, isAdmin }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Meu Perfil</h2>
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-4xl font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{userName}</h3>
            <p className="text-gray-600">{userEmail}</p>
            {isAdmin && (
              <span className="inline-block mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                Admin
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
