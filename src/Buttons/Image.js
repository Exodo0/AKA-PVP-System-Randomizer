const { EmbedBuilder } = require("discord.js");
const { error, buttons, embeds: e } = require("../Utils/EmbedFuntions");

module.exports = {
  id: "CEimage",

  async execute(interaction, client) {
    // incrustaciones
    const embeds = interaction.message.embeds;
    let modifiedEmbed = embeds[1];
    // utilidades
    const imageEmbed = e.imageEmbed;
    interaction.message.edit({ embeds: [imageEmbed, embeds[1]] });

    let msgEmbed = new EmbedBuilder()
      .setColor("F4D58D")
      .setDescription("**Ingresa un enlace directo de la imagen:**");
    interaction.reply({ embeds: [msgEmbed] });

    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    buttons(client, interaction, collector);

    collector.on("collect", (m) => {
      let image = "";

      image = m.content;

      // verifica si la imagen es un enlace válido de imagen
      if (
        !image.match(/\.(jpeg|jpg|png|gif)$/) ||
        !image.match(/^https?:\/\//)
      ) {
        return error(interaction, "Enlace de imagen inválido", m);
      }

      interaction.editReply({
        embeds: [
          msgEmbed.setDescription(
            `**Envía un nuevo enlace para actualizar la imagen**`
          ),
        ],
      });

      modifiedEmbed = EmbedBuilder.from(embeds[1]).setImage(image);

      interaction.message
        .edit({
          embeds: [imageEmbed, modifiedEmbed],
        })
        .then(() => setTimeout(() => m.delete(), 1000));
    });
  },
};
