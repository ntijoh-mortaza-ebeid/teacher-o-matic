require 'sinatra'

class Server < Sinatra::Base

    def initialize
        super
        @db = SQLite3::Database.new('db/assessments.db')
        @db.results_as_hash = true
    end

    # show
    get('/assessments/:id') do
        content_type :json
        result = @db.execute('SELECT * FROM assessments WHERE fork_id = ?', params['id']).first
        if result == nil
            halt 404
        end
        return result.to_json
    end

    # update / create
    put('/assessments/:id') do
        content_type :json
        exists = @db.execute('SELECT * FROM assessments WHERE fork_id=?', params['id']).first != nil
        values = [params['comment'], params['status'], params['id']]
        result = @db.execute('INSERT OR REPLACE INTO assessments (comment, status, fork_id) VALUES (?, ?, ?) RETURNING *', values).first
        
        if exists
            halt 204
        else
            halt 201, result.to_json
        end
    end

end
