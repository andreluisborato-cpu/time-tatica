
import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { RosterManager } from './components/RosterManager';
import { TacticsBoard } from './components/TacticsBoard';
import { DesignStudio } from './components/DesignStudio';
import { AdminPanel } from './components/AdminPanel';
import { TeamChat } from './components/TeamChat';
import { TeamData } from './types';
import { Users, Layout, Paintbrush, LogOut, Shield, MessageSquare } from 'lucide-react';

// Initial state for a new user
const INITIAL_TEAM: TeamData = {
  id: 'team-1',
  ownerEmail: '',
  readOnlyEmails: [],
  identity: {
    name: 'Meu Time FC',
    primaryColor: '#16a34a',
    secondaryColor: '#ffffff'
  },
  players: [],
  formation: '4-4-2',
  lineup: {},
  messages: []
};

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'roster' | 'tactics' | 'design' | 'admin' | 'chat'>('roster');
  const [teamData, setTeamData] = useState<TeamData>(INITIAL_TEAM);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('varzea_user');
    if (savedUser) {
      handleLogin(savedUser);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever teamData changes
  useEffect(() => {
    if (user && isLoaded && teamData.ownerEmail) {
        // Save using the owner's email as the key.
        localStorage.setItem(`varzea_team_${teamData.ownerEmail}`, JSON.stringify(teamData));
    }
  }, [teamData, user, isLoaded]);

  const handleLogin = (email: string) => {
    setUser(email);
    
    // Logic to find which team to load.
    const ownedTeamJson = localStorage.getItem(`varzea_team_${email}`);
    
    if (ownedTeamJson) {
        setTeamData(JSON.parse(ownedTeamJson));
        return;
    }

    // Check all local storage keys to see if this email is authorized as read-only on another team.
    let foundTeam = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('varzea_team_')) {
            const dataStr = localStorage.getItem(key);
            if (dataStr) {
                const data = JSON.parse(dataStr) as TeamData;
                if (data.readOnlyEmails && data.readOnlyEmails.includes(email)) {
                    setTeamData(data);
                    foundTeam = true;
                    break;
                }
            }
        }
    }

    if (!foundTeam) {
        // Create new team
        setTeamData({ ...INITIAL_TEAM, ownerEmail: email });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('varzea_user');
    setUser(null);
    setTeamData(INITIAL_TEAM);
    setActiveTab('roster');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const isOwner = user === teamData.ownerEmail;
  const isReadOnly = !isOwner;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div 
                className="w-8 h-8 rounded-full border-2 border-gray-600 overflow-hidden bg-gray-700"
                style={{ borderColor: teamData.identity.primaryColor }}
            >
                 {teamData.identity.logoUrl && <img src={teamData.identity.logoUrl} className="w-full h-full object-cover" />}
            </div>
            <span className="font-bold truncate max-w-[150px]">{teamData.identity.name}</span>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-400"><LogOut className="w-5 h-5"/></button>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700 h-screen sticky top-0">
        <div className="p-6 border-b border-gray-700">
           <div className="flex items-center gap-3 mb-4">
                <div 
                    className="w-12 h-12 rounded-full border-2 border-gray-500 overflow-hidden bg-gray-900 flex-shrink-0"
                     style={{ borderColor: teamData.identity.primaryColor }}
                >
                    {teamData.identity.logoUrl ? (
                        <img src={teamData.identity.logoUrl} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">Logo</div>
                    )}
                </div>
                <div className="overflow-hidden w-full">
                    {isOwner ? (
                        <input 
                            value={teamData.identity.name}
                            onChange={(e) => setTeamData({...teamData, identity: {...teamData.identity, name: e.target.value}})}
                            className="bg-transparent font-bold text-lg w-full outline-none focus:border-b border-green-500 truncate"
                            placeholder="Nome do Time"
                        />
                    ) : (
                        <span className="font-bold text-lg w-full truncate block" title={teamData.identity.name}>{teamData.identity.name}</span>
                    )}
                    <div className="text-xs text-gray-400 truncate" title={user}>{user}</div>
                    {isReadOnly && <div className="text-[10px] text-yellow-500 font-bold uppercase mt-1">Visitante</div>}
                </div>
           </div>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-2">
            <button
                onClick={() => setActiveTab('roster')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'roster' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            >
                <Users className="w-5 h-5" />
                <span className="font-medium">Elenco</span>
            </button>
            <button
                onClick={() => setActiveTab('tactics')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'tactics' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            >
                <Layout className="w-5 h-5" />
                <span className="font-medium">Prancheta Tática</span>
            </button>
            <button
                onClick={() => setActiveTab('design')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'design' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            >
                <Paintbrush className="w-5 h-5" />
                <span className="font-medium">Estúdio Criativo</span>
            </button>
            <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Chat do Time</span>
            </button>
            
            {/* Admin Tab - Only visible to Owner */}
            {isOwner && (
                <button
                    onClick={() => setActiveTab('admin')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'admin' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Painel Admin</span>
                </button>
            )}
        </div>

        <div className="p-4 border-t border-gray-700">
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition"
            >
                <LogOut className="w-4 h-4" /> Sair
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 h-[calc(100vh-64px)] md:h-screen overflow-y-auto bg-gray-900 p-4 md:p-8">
        {/* Mobile Tabs */}
        <div className="md:hidden flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setActiveTab('roster')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'roster' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Elenco</button>
            <button onClick={() => setActiveTab('tactics')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'tactics' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Tática</button>
            <button onClick={() => setActiveTab('design')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'design' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Design</button>
            <button onClick={() => setActiveTab('chat')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Chat</button>
            {isOwner && <button onClick={() => setActiveTab('admin')} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'admin' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Admin</button>}
        </div>

        <div className="max-w-6xl mx-auto h-full">
            {activeTab === 'roster' && (
                <RosterManager 
                    players={teamData.players} 
                    setPlayers={(newPlayers) => setTeamData(prev => ({ 
                        ...prev, 
                        players: typeof newPlayers === 'function' ? newPlayers(prev.players) : newPlayers 
                    }))} 
                    readOnly={isReadOnly}
                    currentFormation={teamData.formation}
                />
            )}
            {activeTab === 'tactics' && (
                <TacticsBoard teamData={teamData} setTeamData={setTeamData} readOnly={isReadOnly} />
            )}
            {activeTab === 'design' && (
                <DesignStudio teamData={teamData} setTeamData={setTeamData} readOnly={isReadOnly} />
            )}
            {activeTab === 'chat' && (
                <TeamChat teamData={teamData} setTeamData={setTeamData} currentUser={user} />
            )}
            {activeTab === 'admin' && isOwner && (
                <AdminPanel teamData={teamData} setTeamData={setTeamData} />
            )}
        </div>
      </main>
    </div>
  );
}
