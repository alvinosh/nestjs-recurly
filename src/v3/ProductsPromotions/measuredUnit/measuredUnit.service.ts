import { RecurlyConfigDto } from '../../../config/config.dto'
import { InjectConfig } from '../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListMeasuredUnitsQueryDto,
	RecurlyCreateMeasuredUnitDto,
	RecurlyUpdateMeasuredUnitDto,
} from './measuredUnit.dto'
import { RecurlyMeasuredUnit, RecurlyMeasuredUnitList } from './measuredUnit.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MeasuredUnitService {
	private readonly logger = new Logger(MeasuredUnitService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listMeasuredUnits(
		params?: RecurlyListMeasuredUnitsQueryDto,
		apiKey?: string,
	): Promise<RecurlyMeasuredUnitList> {
		let url = `${RECURLY_API_BASE_URL}/measured_units`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Measured Units')
		return (await response.json()) as RecurlyMeasuredUnitList
	}

	async createMeasuredUnit(data: RecurlyCreateMeasuredUnitDto, apiKey?: string): Promise<RecurlyMeasuredUnit> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/measured_units`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Measured Unit')
		return (await response.json()) as RecurlyMeasuredUnit
	}

	async getMeasuredUnit(measuredUnitId: string, apiKey?: string): Promise<RecurlyMeasuredUnit> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/measured_units/${measuredUnitId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Measured Unit')
		return (await response.json()) as RecurlyMeasuredUnit
	}

	async updateMeasuredUnit(
		measuredUnitId: string,
		data: RecurlyUpdateMeasuredUnitDto,
		apiKey?: string,
	): Promise<RecurlyMeasuredUnit> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/measured_units/${measuredUnitId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Measured Unit')
		return (await response.json()) as RecurlyMeasuredUnit
	}

	async removeMeasuredUnit(measuredUnitId: string, apiKey?: string): Promise<RecurlyMeasuredUnit> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/measured_units/${measuredUnitId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Measured Unit')
		return (await response.json()) as RecurlyMeasuredUnit
	}
}
