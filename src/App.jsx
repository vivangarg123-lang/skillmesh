import { useState } from "react";
import {
  Sparkles,
  Search,
  Users,
  Code2,
  Brain,
  Palette,
  Server,
  Plus,
  X,
  Check,
  Target,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";

import "./App.css";

const initialStudents = [
  {
    id: 1,
    name: "Aarav Mehta",
    initials: "AM",
    role: "Frontend Developer",
    skills: ["React", "JavaScript", "CSS", "UI/UX"],
    interests: ["Web apps", "EdTech"],
    bio: "I love building clean and intuitive interfaces.",
    color: "violet",
  },
  {
    id: 2,
    name: "Ishita Sharma",
    initials: "IS",
    role: "AI / ML Engineer",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Science"],
    interests: ["AI", "Healthcare"],
    bio: "Building practical AI solutions for real-world problems.",
    color: "pink",
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    initials: "RK",
    role: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB", "API Design"],
    interests: ["FinTech", "Cloud"],
    bio: "Backend systems, APIs, and making things scale.",
    color: "blue",
  },
  {
    id: 4,
    name: "Ananya Verma",
    initials: "AV",
    role: "Product Designer",
    skills: ["Figma", "UI/UX", "Prototyping", "CSS"],
    interests: ["Design", "Accessibility"],
    bio: "Designing experiences that people actually enjoy.",
    color: "orange",
  },
  {
    id: 5,
    name: "Kabir Singh",
    initials: "KS",
    role: "Full-stack Developer",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    interests: ["SaaS", "Open source"],
    bio: "Happy to work across the stack and learn new things.",
    color: "green",
  },
  {
    id: 6,
    name: "Meera Iyer",
    initials: "MI",
    role: "AI / ML Engineer",
    skills: ["Python", "NLP", "LLMs", "FastAPI"],
    interests: ["AI", "Climate tech"],
    bio: "Interested in using AI for meaningful impact.",
    color: "teal",
  },
];

const skillGroups = [
  {
    name: "Frontend",
    icon: Code2,
    color: "purple",
    skills: ["React", "JavaScript", "CSS", "UI/UX"],
  },
  {
    name: "Backend",
    icon: Server,
    color: "blue",
    skills: ["Node.js", "Express", "MongoDB", "API Design"],
  },
  {
    name: "AI / ML",
    icon: Brain,
    color: "pink",
    skills: ["Python", "Machine Learning", "TensorFlow", "NLP", "LLMs"],
  },
  {
    name: "Design",
    icon: Palette,
    color: "orange",
    skills: ["Figma", "UI/UX", "Prototyping", "CSS"],
  },
];

const allSkills = [
  ...new Set(skillGroups.flatMap((group) => group.skills)),
  "TypeScript",
  "PostgreSQL",
  "FastAPI",
  "Data Science",
];

function App() {
  const [students] = useState(initialStudents);

  const [mySkills, setMySkills] = useState([
    "React",
    "JavaScript",
    "CSS",
  ]);

  const [myInterests, setMyInterests] = useState([
    "Web apps",
    "AI",
  ]);

  const [myRole, setMyRole] = useState("Frontend Developer");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Everyone");

  const [team, setTeam] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [activeNav, setActiveNav] = useState("Discover");

  const toggleItem = (item, list, setter) => {
    setter(
      list.includes(item)
        ? list.filter((value) => value !== item)
        : [...list, item]
    );
  };

  const addToTeam = (student) => {
    if (team.includes(student.id)) return;

    if (team.length >= 4) {
      alert("Your demo team is full!");
      return;
    }

    setTeam([...team, student.id]);
  };

  const removeFromTeam = (id) => {
    setTeam(team.filter((memberId) => memberId !== id));
  };

  const teamMembers = students.filter((student) =>
    team.includes(student.id)
  );

  const teamSkills = [
    ...new Set([
      ...mySkills,
      ...teamMembers.flatMap((member) => member.skills),
    ]),
  ];

  const coveredGroups = skillGroups.filter((group) =>
    group.skills.some((skill) => teamSkills.includes(skill))
  );

  const coverage = Math.round(
    (coveredGroups.length / skillGroups.length) * 100
  );

  const matchedStudents = students
    .filter((student) => !team.includes(student.id))
    .map((student) => {
      const complementary = student.skills.filter(
        (skill) => !mySkills.includes(skill)
      );

      const common = student.skills.filter(
        (skill) => mySkills.includes(skill)
      );

      const interestMatch = student.interests.filter(
        (interest) => myInterests.includes(interest)
      ).length;

      const match = Math.min(
        99,
        Math.max(
          60,
          65 + complementary.length * 5 + interestMatch * 4 - common.length * 2
        )
      );

      return {
        ...student,
        match,
        complementary,
        common,
      };
    })
    .filter(
      (student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        )
    )
    .filter(
      (student) =>
        roleFilter === "Everyone" ||
        student.role.includes(roleFilter)
    )
    .sort((a, b) => b.match - a.match);

  return (
    <div className="app-shell">
      {/* Sidebar */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>

          <span>
            skill<span className="brand-light">mesh</span>
          </span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav>
          {[
            { name: "Discover", icon: Search },
            { name: "My Team", icon: Users },
            { name: "My Profile", icon: Target },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${
                activeNav === name ? "active" : ""
              }`}
              onClick={() => {
                setActiveNav(name);

                if (name === "My Profile") {
                  setShowProfile(true);
                }
              }}
            >
              <Icon size={18} />
              {name}

              {name === "My Team" && team.length > 0 && (
                <span className="nav-count">{team.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <Sparkles size={18} />

            <h4>Build your dream team</h4>

            <p>
              Great teams are built on complementary skills,
              not just common interests.
            </p>
          </div>

          <div className="user-mini">
            <div className="avatar avatar-me">YOU</div>

            <div>
              <strong>Your profile</strong>
              <small>Student · Thapar</small>
            </div>

            <button onClick={() => setShowProfile(true)}>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main dashboard */}

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> {activeNav}
          </div>

          <div className="topbar-right">
            <span className="online-dot" />
            Hackathon season is on
          </div>
        </header>

        <section className="welcome-row">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              TEAM UP SMARTER
            </div>

            <h1>
              Find your <span>perfect team.</span>
            </h1>

            <p>
              Discover people who complement your skills
              and turn great ideas into winning projects.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowProfile(true)}
          >
            <Plus size={17} />
            Edit my profile
          </button>
        </section>

        {/* Hero */}

        <section className="hero-banner">
          <div className="hero-copy">
            <span className="hero-pill">
              <span className="pulse" />
              YOUR TEAM BUILDER
            </span>

            <h2>
              Better together.
              <br />
              <span>Built by skills.</span>
            </h2>

            <p>
              Find your missing pieces, connect with
              like-minded builders, and create something incredible.
            </p>

            <button
              className="hero-btn"
              onClick={() =>
                document
                  .getElementById("matches")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore teammates <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="orb-center">
              <Sparkles size={28} />
            </div>

            <div className="floating-avatar f1">AM</div>
            <div className="floating-avatar f2">IS</div>
            <div className="floating-avatar f3">RK</div>
            <div className="floating-avatar f4">AV</div>
          </div>
        </section>

        {/* Statistics */}

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple-bg">
              <Users size={19} />
            </div>

            <div>
              <small>Potential teammates</small>
              <strong>248</strong>
              <p>Students in your network</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue-bg">
              <Target size={19} />
            </div>

            <div>
              <small>Team skill coverage</small>
              <strong>{coverage}%</strong>
              <p>{coveredGroups.length} of 4 skill areas covered</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink-bg">
              <Sparkles size={19} />
            </div>

            <div>
              <small>Best compatibility</small>
              <strong>{matchedStudents[0]?.match || 0}%</strong>
              <p>Your top teammate match</p>
            </div>
          </div>
        </section>

        {/* Main content */}

        <section className="content-grid">
          <div className="main-column" id="matches">
            <div className="section-heading">
              <div>
                <h2>Discover teammates</h2>
                <p>
                  People whose skills could make your team stronger.
                </p>
              </div>

              <button
                className="filter-btn"
                onClick={() =>
                  setRoleFilter(
                    roleFilter === "Everyone" ? "AI / ML" : "Everyone"
                  )
                }
              >
                <SlidersHorizontal size={16} />
                Quick filter
              </button>
            </div>

            <div className="search-row">
              <div className="search-box">
                <Search size={17} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or skill..."
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option>Everyone</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>AI / ML</option>
                <option>Designer</option>
                <option>Full-stack</option>
              </select>
            </div>

            <div className="match-list">
              {matchedStudents.map((student) => (
                <article className="match-card" key={student.id}>
                  <div className={`avatar avatar-${student.color}`}>
                    {student.initials}
                  </div>

                  <div className="match-info">
                    <h3>{student.name}</h3>

                    <p className="role">{student.role}</p>

                    <p className="bio">{student.bio}</p>

                    <div className="skill-tags">
                      {student.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`skill-tag ${
                            mySkills.includes(skill) ? "shared" : ""
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="match-meta">
                      <span>
                        <span className="green-dot" />
                        Available
                      </span>

                      <span>
                        {student.complementary.length} complementary skills
                      </span>
                    </div>
                  </div>

                  <div className="match-action">
                    <div className="match-score">
                      <strong>{student.match}%</strong>
                      <small>match</small>
                    </div>

                    <button
                      className={`add-btn ${
                        team.includes(student.id) ? "added" : ""
                      }`}
                      onClick={() =>
                        team.includes(student.id)
                          ? removeFromTeam(student.id)
                          : addToTeam(student)
                      }
                    >
                      {team.includes(student.id) ? (
                        <>
                          <Check size={15} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={15} /> Add
                        </>
                      )}
                    </button>
                  </div>
                </article>
              ))}

              {matchedStudents.length === 0 && (
                <div className="empty-state">
                  <Search size={28} />
                  <h3>No teammates found</h3>
                  <p>Try another search or role.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}

          <aside className="right-column">
            <div className="panel">
              <div className="panel-heading">
                <div>
                  <h3>My dream team</h3>
                  <p>Your team in progress</p>
                </div>

                <span className="team-count">
                  {team.length + 1}/5
                </span>
              </div>

              <div className="team-members">
                <div className="team-member">
                  <div className="avatar avatar-me">YOU</div>

                  <div>
                    <strong>You</strong>
                    <small>{myRole}</small>
                  </div>
                </div>

                {teamMembers.map((member) => (
                  <div className="team-member" key={member.id}>
                    <div className={`avatar avatar-${member.color}`}>
                      {member.initials}
                    </div>

                    <div>
                      <strong>{member.name}</strong>
                      <small>{member.role}</small>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromTeam(member.id)}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="team-footer">
                {team.length} teammates added
              </p>
            </div>

            {/* Skill coverage */}

            <div className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Skill coverage</h3>
                  <p>What your team brings</p>
                </div>

                <strong className="coverage-percent">
                  {coverage}%
                </strong>
              </div>

              <div className="coverage-bar">
                <div style={{ width: `${coverage}%` }} />
              </div>

              <div className="coverage-list">
                {skillGroups.map((group) => {
                  const Icon = group.icon;

                  const covered = group.skills.some((skill) =>
                    teamSkills.includes(skill)
                  );

                  return (
                    <div className="coverage-item" key={group.name}>
                      <div className={`coverage-icon ${group.color}`}>
                        <Icon size={15} />
                      </div>

                      <div className="coverage-label">
                        <strong>{group.name}</strong>

                        <small>
                          {covered
                            ? "Skills represented"
                            : "Missing from team"}
                        </small>
                      </div>

                      <span
                        className={`coverage-status ${
                          covered ? "covered" : "missing"
                        }`}
                      >
                        {covered ? <Check size={13} /> : <Plus size={13} />}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="coverage-note">
                <Sparkles size={14} />

                <span>
                  {coverage === 100
                    ? "Your team has a well-rounded skill mix!"
                    : "Add teammates with missing skills to strengthen your team."}
                </span>
              </div>
            </div>

            {/* Your profile */}

            <div className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Your skill profile</h3>
                  <p>What you bring to the table</p>
                </div>

                <button
                  className="edit-icon"
                  onClick={() => setShowProfile(true)}
                >
                  <ArrowUpRight size={15} />
                </button>
              </div>

              <div className="profile-skills">
                {mySkills.map((skill) => (
                  <span className="skill-tag shared" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>

              <button
                className="edit-profile-btn"
                onClick={() => setShowProfile(true)}
              >
                Edit profile
              </button>
            </div>
          </aside>
        </section>

        <footer className="footer">
          <span>© 2026 SkillMesh</span>
          <span>Built for builders, by builders ✨</span>
        </footer>
      </main>

      {/* Profile modal */}

      {showProfile && (
        <div
          className="modal-backdrop"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <div className="eyebrow">YOUR BUILDER PROFILE</div>

                <h2>Show the world what you do.</h2>

                <p>
                  Help us find teammates who complement your strengths.
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                <X size={18} />
              </button>
            </div>

            <label className="field-label">
              Your primary role
            </label>

            <select
              className="role-select"
              value={myRole}
              onChange={(e) => setMyRole(e.target.value)}
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>AI / ML Engineer</option>
              <option>Product Designer</option>
              <option>Full-stack Developer</option>
              <option>Beginner / Explorer</option>
            </select>

            <label className="field-label">
              Your skills
              <span>Choose all that apply</span>
            </label>

            <div className="skill-picker">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  className={`picker-chip ${
                    mySkills.includes(skill) ? "selected" : ""
                  }`}
                  onClick={() =>
                    toggleItem(skill, mySkills, setMySkills)
                  }
                >
                  {mySkills.includes(skill) && <Check size={13} />}
                  {skill}
                </button>
              ))}
            </div>

            <label className="field-label">Interests</label>

            <div className="skill-picker">
              {[
                "Web apps",
                "AI",
                "Healthcare",
                "FinTech",
                "EdTech",
                "Climate tech",
                "Open source",
                "SaaS",
                "Design",
              ].map((interest) => (
                <button
                  key={interest}
                  className={`picker-chip ${
                    myInterests.includes(interest) ? "selected" : ""
                  }`}
                  onClick={() =>
                    toggleItem(
                      interest,
                      myInterests,
                      setMyInterests
                    )
                  }
                >
                  {myInterests.includes(interest) && (
                    <Check size={13} />
                  )}

                  {interest}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowProfile(false)}
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={() => setShowProfile(false)}
              >
                Save profile <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;