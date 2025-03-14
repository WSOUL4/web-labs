import { Event } from "../../Models/Event/event.model";


// Function to check if a given event ID is unique
async function isUniqueId(val: string): Promise<boolean> {
  try {
    const count = await Event.count({
      where: { id: val },
    });
    return count === 0; // Returns true if the ID is unique (count === 0)
  } catch (error) {
    console.error("Error checking unique event ID:", error);
    throw new Error("Database error while checking unique event ID");
  }
}

export { isUniqueId };