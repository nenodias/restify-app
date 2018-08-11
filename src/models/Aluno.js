const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const AlunoSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		}
    },
    { minimize: false },
);

AlunoSchema.plugin(timestamps);

const Aluno = mongoose.model('Aluno', AlunoSchema);
module.exports = Aluno;