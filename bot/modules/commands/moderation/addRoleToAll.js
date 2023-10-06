const {
    PermissionFlagsBits,
    ApplicationCommandOptionType
} = require("discord.js");
const { BotCommandDeployment } = require("@disqada/halfbot");
const { setTimeout } = require("timers/promises");

const roleCode = "role";

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandData & import("discord.js").ChatInputApplicationCommandData}
 */
const data = {
    dmPermission: false,
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
    name: "add-role-to-all",
    description: "Give a role to all members",
    deployment: BotCommandDeployment.SupportGuild,
    category: "moderation",
    module: "command",
    options: [
        {
            type: ApplicationCommandOptionType.Role,
            name: roleCode,
            description: "The role to add",
            required: true
        }
    ]
};

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandFunction}
 * @param {import("@disqada/halfbot/src/entities/command").BotCommandInteraction & import("discord.js").ChatInputCommandInteraction} interaction
 */
async function execute(interaction) {
    /**
     * @param {Error} err
     * @param {import("discord.js").Role} role
     * @param {number} membersRoleAddedToCount
     * @returns {import("discord.js").ReplyOptions}
     */
    function sendError(err, role, membersRoleAddedToCount = 0) {
        /** @type {import("discord.js").APIEmbed} */
        const embed = {
            description: `An error occurred while adding "<@&${role.id}>", broke at the ${membersRoleAddedToCount}th member.`
        };

        return {
            content: err.message,
            embeds: [embed]
        };
    }

    /** @type {import("discord.js").Role} */
    let role;
    try {
        role = interaction.options.getRole(roleCode);
    } catch (err) {
        return sendError(err, role);
    }

    const members = await interaction.guild.members.fetch();

    let addedToCount = 0;
    let hadItCount = 0;
    const totalCount = members.size;
    let startedAt = interaction.createdTimestamp;

    for (const pairObj of members) {
        const memberRoles = pairObj[1].roles;

        if (memberRoles.cache.has(role.id)) {
            hadItCount++;
            continue;
        }

        await memberRoles.add(role.id);
        addedToCount++;

        const now = Date.now();
        if (now - startedAt > 60000) {
            startedAt = now;
            const msg = `Still adding ..., reached member number ${addedToCount}`;

            await interaction.editReply(msg);
        }

        await setTimeout(100);
    }

    /** @type {import("discord.js").APIEmbed} */
    const embed = {
        description: `Finished adding the role <@&${
            role.id
        }> to ${addedToCount} members\n- members had the role: ${hadItCount}\n- members left unchecked: ${
            totalCount - hadItCount - addedToCount
        }\n- time took to finish: ${new Date(
            Date.now() - interaction.createdTimestamp
        ).getSeconds()} seconds`
    };

    return { embeds: [embed] };
}

module.exports = { data, execute };
