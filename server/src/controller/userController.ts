import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { User } from "../entity/User";
import { dataSource } from "../config/connnection";
import { isValidEmail } from "../config/validation";
import e = require("express");

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const userRepository = dataSource.getRepository(User);
  const count = await userRepository.count();
  const users = await userRepository.find({
    skip: (page - 1) * limit,
    take: limit,
  });
  if (users.length) {
    res.json({
      result: users,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalUsers: count,
    });
  } else {
    res.status(200).json({ result: [], message: "No users found" });
  }
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await dataSource.getRepository(User).findOneBy({
    id: parseInt(userId),
  });
  if (user) {
    res.json({
      user,
      message: "success",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName) {
    res.status(400);
    throw new Error("Please provide a valid first name");
  }

  if (!lastName) {
    res.status(400);
    throw new Error("Please provide a valid last name");
  }

  if (!email || !isValidEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  const check = await dataSource.getRepository(User).findOneBy({
    email: email,
  });
  if (check) {
    res.status(409);
    throw new Error("user exists");
  }

  const userRepository = dataSource.getRepository(User);
  const newUser = userRepository.create({
    firstName,
    lastName,
    email,
  });
  const savedUser = await userRepository.save(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: savedUser,
  });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const userRepository = dataSource.getRepository(User);

  // Find the user by ID
  const user = await dataSource.getRepository(User).findOneBy({
    id: userId,
  });

  // Check if the user exists
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Remove the user
  await userRepository.remove(user);

  res.json({ message: "User deleted successfully" });
});

const updateUser = asyncHandler(async (req: Request, res: any) => {
  const userId = parseInt(req.params.userId); // Assuming userId is a number
  const { firstName, lastName, email } = req.body;
  const userRepository = dataSource.getRepository(User);

  // Check if a user with the given name already exists
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser && existingUser.id !== userId) {
    return res
      .status(400)
      .json({ message: "User with this name already exists" });
  }

  // Find the user by ID
  const user = await dataSource.getRepository(User).findOneBy({
    id: userId,
  });
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  // Update the user
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  // Save the updated user to the database
  const updatedUser = await userRepository.save(user);

  res.status(200).json({
    message: "User was updated successfully",
    user: updatedUser,
  });
});

export { getUsers, getUser, createUser, deleteUser, updateUser };
