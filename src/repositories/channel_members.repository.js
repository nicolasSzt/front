import ChannelMembers from "../models/Channel_members.model.js";

class ChannelMembersRepository {
  async create({ channel_id, member_channel_id, created_at }) {
    try {
      const channel = new ChannelMembers({
        member_channel_id,
        channel_id,
        created_at,
      });
      await channel.save();
      console.log("channel creado exitosamente!");
    } catch (error) {
      console.log(error);
    }
  }
}

const channel_members_repository = new ChannelMembersRepository();

export default channel_members_repository;
