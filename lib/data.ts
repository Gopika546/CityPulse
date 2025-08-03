export const issuesData = [
  {
    id: 1,
    name: "John Smith",
    area: "Sector 5",
    category: "Waste Management",
    description: "Garbage overflow near the main market area. The bins are overflowing and creating unhygienic conditions.",
    status: "Pending",
    dateSubmitted: "2024-01-15",
    priority: "High",
    department: "Sanitation"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    area: "Sector 2",
    category: "Infrastructure",
    description: "Streetlight not working on Oak Street. The area becomes very dark at night causing safety concerns.",
    status: "In Progress",
    dateSubmitted: "2024-01-12",
    priority: "Medium",
    department: "Electricity"
  },
  {
    id: 3,
    name: "David Chen",
    area: "Sector 3",
    category: "Road Maintenance",
    description: "Large pothole on Main Avenue near the school. Vehicle damage reported.",
    status: "Resolved",
    dateSubmitted: "2024-01-10",
    dateResolved: "2024-01-14",
    priority: "High",
    department: "Public Works"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    area: "Sector 1",
    category: "Traffic",
    description: "Traffic signal malfunction at City Center intersection causing long delays.",
    status: "In Progress",
    dateSubmitted: "2024-01-13",
    priority: "High",
    department: "Traffic Management"
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    area: "Sector 4",
    category: "Water Supply",
    description: "Low water pressure in residential area affecting multiple buildings.",
    status: "Pending",
    dateSubmitted: "2024-01-16",
    priority: "Medium",
    department: "Water Department"
  }
];

export const alertsData = [
  {
    id: 1,
    title: "Water Outage in Sector 4",
    description: "Scheduled maintenance will cause water outage in Sector 4 from 2 PM to 6 PM today.",
    area: "Sector 4",
    type: "maintenance",
    severity: "Medium",
    dateCreated: "2024-01-16",
    timeCreated: "10:30 AM",
    isActive: true
  },
  {
    id: 2,
    title: "Traffic Congestion in Sector 1",
    description: "Heavy traffic congestion reported at City Center due to ongoing construction work.",
    area: "Sector 1",
    type: "traffic",
    severity: "High",
    dateCreated: "2024-01-16",
    timeCreated: "8:15 AM",
    isActive: true
  },
  {
    id: 3,
    title: "Power Outage Alert - Sector 3",
    description: "Partial power outage in Sector 3 residential area. Repair crews dispatched.",
    area: "Sector 3",
    type: "emergency",
    severity: "High",
    dateCreated: "2024-01-15",
    timeCreated: "11:45 PM",
    isActive: true
  },
  {
    id: 4,
    title: "Road Closure - Oak Street",
    description: "Oak Street closed for emergency repairs. Use alternate routes.",
    area: "Sector 2",
    type: "infrastructure",
    severity: "Medium",
    dateCreated: "2024-01-15",
    timeCreated: "2:20 PM",
    isActive: false
  },
  {
    id: 5,
    title: "Community Event - Park Festival",
    description: "Annual park festival in Central Park. Expect increased foot traffic and parking restrictions.",
    area: "Sector 5",
    type: "event",
    severity: "Low",
    dateCreated: "2024-01-14",
    timeCreated: "9:00 AM",
    isActive: true
  }
];

export const projectsData = [
  {
    id: 1,
    name: "Metro Line Expansion",
    description: "Extension of the metro line to connect Sectors 4 and 5 with the city center.",
    status: "Ongoing",
    progress: 60,
    budget: 50000000,
    budgetSpent: 30000000,
    startDate: "2023-06-01",
    expectedCompletion: "2025-03-30",
    department: "Transportation",
    area: "Multiple Sectors",
    priority: "High"
  },
  {
    id: 2,
    name: "Park Renovation Project",
    description: "Complete renovation of Central Park including new playground equipment and landscaping.",
    status: "Planning",
    progress: 15,
    budget: 2500000,
    budgetSpent: 375000,
    startDate: "2024-02-01",
    expectedCompletion: "2024-08-15",
    department: "Parks & Recreation",
    area: "Sector 5",
    priority: "Medium"
  },
  {
    id: 3,
    name: "Smart Traffic System",
    description: "Implementation of AI-powered traffic management system across all major intersections.",
    status: "Ongoing",
    progress: 35,
    budget: 15000000,
    budgetSpent: 5250000,
    startDate: "2023-09-15",
    expectedCompletion: "2024-06-30",
    department: "Traffic Management",
    area: "All Sectors",
    priority: "High"
  },
  {
    id: 4,
    name: "Water Pipeline Upgrade",
    description: "Replacement of aging water pipelines in Sectors 2 and 3.",
    status: "Completed",
    progress: 100,
    budget: 8000000,
    budgetSpent: 7800000,
    startDate: "2023-01-10",
    expectedCompletion: "2023-12-20",
    completedDate: "2023-12-18",
    department: "Water Department",
    area: "Sectors 2 & 3",
    priority: "High"
  },
  {
    id: 5,
    name: "Solar Street Lighting",
    description: "Installation of solar-powered LED street lights in residential areas.",
    status: "Planned",
    progress: 5,
    budget: 3500000,
    budgetSpent: 175000,
    startDate: "2024-04-01",
    expectedCompletion: "2024-10-31",
    department: "Electricity",
    area: "All Sectors",
    priority: "Medium"
  }
];