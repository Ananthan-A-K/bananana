import Complaint from '../models/Complaint.js';
import User from '../models/User.js';

const APPROVAL_STATUSES = ['pending', 'approved'];

function buildUserRecord(user, complaintCount) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    approvalStatus: user.approvalStatus || 'approved',
    complaints: complaintCount,
    activityStatus: complaintCount > 0 ? 'active' : 'inactive',
    createdAt: user.createdAt,
  };
}

export async function getAdminUsers(req, res) {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    const complaints = await Complaint.find({}).select('createdBy student');

    const complaintCounts = complaints.reduce((acc, complaint) => {
      const ownerId = complaint.createdBy?.toString?.() || complaint.student?.toString?.();
      if (!ownerId) {
        return acc;
      }
      acc[ownerId] = (acc[ownerId] || 0) + 1;
      return acc;
    }, {});

    return res.status(200).json(
      users.map((user) => {
        const userId = user._id.toString();
        return buildUserRecord(user, complaintCounts[userId] || 0);
      }),
    );
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
}

export async function createAdminUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      approvalStatus: 'approved',
    });

    return res.status(201).json({
      ...buildUserRecord(user, 0),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create user',
      error: error.message,
    });
  }
}

export async function updateAdminUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password, role, approvalStatus } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) {
      if (!['student', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      user.role = role;
    }
    if (approvalStatus !== undefined) {
      if (!APPROVAL_STATUSES.includes(approvalStatus)) {
        return res.status(400).json({ message: 'Invalid approval status' });
      }
      user.approvalStatus = approvalStatus;
    }
    if (password) user.password = password;

    await user.save();

    const complaints = await Complaint.find({}).select('createdBy student');
    const complaintCount = complaints.filter((complaint) => {
      const ownerId = complaint.createdBy?.toString?.() || complaint.student?.toString?.();
      return ownerId === user._id.toString();
    }).length;

    return res.status(200).json(buildUserRecord(user, complaintCount));
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update user',
      error: error.message,
    });
  }
}

export async function deleteAdminUser(req, res) {
  try {
    const { id } = req.params;

    if (req.user?.id?.toString?.() === id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.deleteOne({ _id: id });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete user',
      error: error.message,
    });
  }
}
